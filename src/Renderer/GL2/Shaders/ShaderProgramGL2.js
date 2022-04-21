/**
 * ShaderProgramGL2是ShaderProgram这个抽象类关于WebGL2的实现类，
 * 它涵盖编译、链接着色器代码等功能
 */

import ShaderProgram from "../../Shaders/ShaderProgram.js";
import ShaderType from "../../Shaders/ShaderType.js";
import ShaderVertexAttribute from "../../Shaders/ShaderVertexAttribute.js";
import ShaderVertexAttributeCollection from "../../Shaders/ShaderVertexAttributeCollection.js";
import ShaderProgramNameGL2 from "../Names/ShaderProgramNameGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";
import FragmentOutputsGL2 from "./FragmentOutputsGL2.js";
import ShaderObjectGL2 from "./ShaderObjectGL2.js";
import UniformCollection from "../../Shaders/UniformCollection.js";
import List from "../../../Core/List/List.js";
import Context from "../../Context.js";
import DrawState from "../../DrawState.js";
import SceneState from "../../Scene/SceneState.js";
import UniformFloatVector3GL2 from "./UniformFloatVector3GL2.js";
import UniformFloatMatrix44GL2 from "./UniformFloatMatrix44GL2.js";
import UniformIntGL2 from "./UniformIntGL2.js";
import Uniform from "../../Shaders/Uniform.js";


class ShaderProgramGL2 extends ShaderProgram {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext} gl 
   * @param {String} vertexShaderSource 
   * @param {String} fragmentShaderSource 
   */
  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    super();

    this._gl = gl;
    // 创建ShaderObjectGL2对象，它们包含WebGLShader对象，并编译了着色器程序源代码
    this._vertexShader = new ShaderObjectGL2(this._gl, ShaderType.VertexShader, vertexShaderSource);
    this._fragmentShader = new ShaderObjectGL2(this._gl, ShaderType.FragmentShader, fragmentShaderSource);
    // 创建ShaderProgramNameGL2对象，它包含了一个WebGLProgram对象
    this._program = new ShaderProgramNameGL2(this._gl);
    const programHandle = this._program.Value;
    // 将顶点着色器和片元着色器的WebGLShader对象添加到WebGLProgram对象 
    this._gl.attachShader(programHandle, this._vertexShader.Handle);
    this._gl.attachShader(programHandle, this._fragmentShader.Handle);
    // 链接给定的WebGLProgram对象
    this._gl.linkProgram(programHandle);
    // 检查链接错误
    this._checkLinkErrors(programHandle);
    // 删除WebGLShader对象
    this._vertexShader.dispose();
    this._fragmentShader.dispose();

    this._fragmentOutputs = new FragmentOutputsGL2(this._gl, this._program);
    
    // 保存着色器中所有的attribute属性的元数据
    this._vertexAttributes = ShaderProgramGL2.FindVertexAttributes(this._gl, this._program);
    this._uniforms = this.findUniforms(this._gl, this._program);
    
    // 任意一个Uniform被更新时，就会添加到_dirtyUniforms这个数组中
    this._dirtyUniforms = new List();
    for (let i = 0, len = this._uniforms.size(); i < len; i++) {
      this._dirtyUniforms.add(this._uniforms.get(i));
    }

    // 初始化AutomaticUniform
    this._initializeAutomaticUniforms(this._uniforms);
  }

  /**
   * 将定义好的WebGLProgram对象添加到当前的渲染状态中
   */
  use() {
    this._gl.useProgram(this._program.Value);
  }

  /**
   * @returns {WebGLProgram}
   */
  get Program() {
    return this._program;
  }

  /**
   * 检查链接错误
   * @param  {WebGLProgram} program
   * @param  {Number} shaderType
   */
  _checkLinkErrors(program) {
    // 如果链接失败，则打印错误信息
    // 即使链接成功了，也有可能运行失败，比如没有为取样器分配纹理单元。这些错误是在运行阶段而不是链接阶段产生的。
    if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
      const infoLog = this._gl.getProgramInfoLog(program);
      const msg = "ERROR::PROGRAM_LINKING_ERROR of type: program\n" + infoLog + "\n -- --------------------------------------------------- -- ";
      window.alert(msg);
      throw new Error(msg);
    }
  }

  /**
   * 查找着色器中所有的attribute属性，并将其抽象为对应的多个ShaderVertexAttribute
   * @param {WebGL2RenderingContext} gl
   * @param  {ShaderProgramNameGL2} program
   * @returns  {ShaderVertexAttributeCollection}
   */
  static FindVertexAttributes(gl, program) {
    const programHandle = program.Value;
    // 获取着色器中激活的attribute变量的数量
    const numberOfAttributes = gl.getProgramParameter(programHandle, gl.ACTIVE_ATTRIBUTES);
    const vertexAttributes = new ShaderVertexAttributeCollection();
    for (let i = 0; i < numberOfAttributes; i++) {
      const activeInfo = gl.getActiveAttrib(programHandle, i);
      const attributeName = activeInfo.name;
      // 跳过前缀为"gl"的attribute变量
      if (attributeName.startsWith("gl_")) {
        continue;
      }
      const attributeLoc = gl.getAttribLocation(programHandle, attributeName);
      vertexAttributes.add(new ShaderVertexAttribute(
        attributeName, attributeLoc, TypeConverterGL2.AttributeTo(activeInfo.type), activeInfo.size));
    }
    return vertexAttributes;
  }

  /**
   * 查找着色器中所有的uniform变量
   * @param  {ShaderProgramNameGL2} program
   * @returns  {UniformCollection}
   */
  findUniforms(gl, program) {
    const programHandle = program.Value;

    // 获取着色器中激活的uniform变量的数量
    const numberOfUniforms = gl.getProgramParameter(programHandle, gl.ACTIVE_UNIFORMS);

    const uniforms = new UniformCollection();
    for (let i = 0; i < numberOfUniforms; i++) {
      const activeInfo = gl.getActiveUniform(programHandle, i);
      // 验证uniform变量名
      const uniformName = ShaderProgramGL2.CorrectUniformName(activeInfo.name);
      // 跳过前缀为"gl"的uniform变量
      if (uniformName.startsWith("gl_")) {
        continue;
      }

      // //
      // // Skip uniforms in a named block
      // //
      // int uniformBlockIndex;
      // GL.GetActiveUniforms(programHandle, 1, ref i, ActiveUniformParameter.UniformBlockIndex, out uniformBlockIndex);
      // if (uniformBlockIndex != -1)
      // {
      //     continue;
      // }
      // const uniformSize = activeInfo.size;
      // if (uniformSize != 1) {

      // }
      const uniformLoc = gl.getUniformLocation(programHandle, uniformName);
      uniforms.add(this._createUniform(uniformName, uniformLoc, activeInfo.type));
       
    }

    return uniforms;
  }

  _createUniform(name, location, type) {
    switch(type) {
      case this._gl.FLOAT_VEC3:
        return new UniformFloatVector3GL2(name, location, this);
      case this._gl.FLOAT_MAT4:
        return new UniformFloatMatrix44GL2(name, location, this);
      case this._gl.SAMPLER_2D:
        return new UniformIntGL2(name, location, this);
    }
  }

  /**
   * 将Uniform实例添加到_dirtyUniforms集合，以等待
   * GL调用进行更新
   * @param {Uniform} value 
   */
  notifyDirty(value) {
    this._dirtyUniforms.add(value);
  }

  static CorrectUniformName(name) {
    return name;
  }

  /**
   * 使用GL调用更新Uniform
   * @param {Context} context 
   * @param {DrawState} drawState 
   * @param {SceneState} sceneState 
   */
  clean(context, drawState, sceneState) {
    // 更新各个DrawAutomaticUniform中Uniform的值
    this._setDrawAutomaticUniforms(context, drawState, sceneState);
    
    // 使用dirtyUniforms中的新值，通过GL调用更新Uniform 
    for (let i = 0, len = this._dirtyUniforms.size(); i < len; i++) {
      this._dirtyUniforms.get(i).clean(this._gl);
    }
    // 清空dirtyUniforms
    this._dirtyUniforms.clear();
  }
}

export default ShaderProgramGL2;
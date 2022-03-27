/**
 * ShaderProgramGL2是ShaderProgram这个抽象类关于WebGL2的实现类
 */

import ShaderProgram from "../../Shaders/ShaderProgram.js";
import ShaderType from "../../Shaders/ShaderType.js";
import ShaderVertexAttribute from "../../Shaders/ShaderVertexAttribute.js";
import ShaderVertexAttributeCollection from "../../ShaderVertexAttributeCollection.js";
import ShaderProgramNameGL2 from "../Names/ShaderProgramNameGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";
import FragmentOutputsGL2 from "./FragmentOutputsGL2.js";
import ShaderObjectGL2 from "./ShaderObjectGL2.js";
import UniformCollection from "../../Shaders/UniformCollection.js";
import UniformGL2 from "./UniformGL2.js";


class ShaderProgramGL2 extends ShaderProgram {
  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    super();

    // 创建ShaderObjectGL2对象，它们包含WebGLShader对象，并编译了着色器程序源代码
    this._vertexShader = new ShaderObjectGL2(gl, ShaderType.VertexShader, vertexShaderSource);
    this._fragmentShader = new ShaderObjectGL2(gl, ShaderType.FragmentShader, fragmentShaderSource);
    // 创建ShaderProgramNameGL2对象，它包含了一个WebGLProgram对象
    this._program = new ShaderProgramNameGL2(gl);
    const programHandle = this._program.Value;
    // 将顶点着色器和片元着色器的WebGLShader对象添加到WebGLProgram对象 
    gl.attachShader(programHandle, this._vertexShader.Handle);
    gl.attachShader(programHandle, this._fragmentShader.Handle);
    // 链接给定的WebGLProgram对象
    gl.linkProgram(programHandle);
    // 检查链接错误
    this._checkLinkErrors(gl, programHandle);
    this._program.gl = gl;

    this._fragmentOutputs = new FragmentOutputsGL2(this._program);
    // 保存着色器中所有的attribute属性的元数据
    this._vertexAttributes = ShaderProgramGL2.FindVertexAttributes(this._program);
    this._uniforms = ShaderProgramGL2.FindUniforms(this._program);
    // 任意一个Uniform被更新时，就会添加到_dirtyUniforms这个数组中
    this._dirtyUniforms = [];
    console.log(this._uniforms);
  }

  /**
   * 检查链接错误
   * @param  {WebGL2RenderingContext} gl
   * @param  {WebGLProgram} program
   * @param  {Number} shaderType
   */
  _checkLinkErrors(gl, program) {
    // 如果链接失败，则打印错误信息
    // 即使链接成功了，也有可能运行失败，比如没有为取样器分配纹理单元。这些错误是在运行阶段而不是链接阶段产生的。
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const infoLog = gl.getProgramInfoLog(program);
      const msg = "ERROR::PROGRAM_LINKING_ERROR of type: program\n" + infoLog + "\n -- --------------------------------------------------- -- ";
      window.alert(msg);
      throw new Error(msg);
    }
  }

  /**
   * 查找着色器中所有的attribute属性
   * @param  {ShaderProgramNameGL2} program
   * @returns  {ShaderVertexAttributeCollection}
   */
  static FindVertexAttributes(program) {
    const programHandle = program.Value;
    const gl = program.gl;
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
  static FindUniforms(program) {
    const programHandle = program.Value;
    const gl = program.gl;

    // 获取着色器中激活的uniform变量的数量
    const numberOfUniforms = gl.getProgramParameter(programHandle, gl.ACTIVE_UNIFORMS);

    const uniforms = new UniformCollection();
    for (let i = 0; i < numberOfUniforms; i++) {
      const activeInfo = gl.getActiveUniform(programHandle, i);
      console.log(activeInfo);
      // 验证uniform变量名
      const uniformName = ShaderProgramGL2.CorrectUniformName(activeInfo.name);
      // 跳过前缀为"gl"的uniform变量
      if (uniformName.startsWith("gl_")) {
        continue;
      }
      // const uniformSize = activeInfo.size;
      // if (uniformSize != 1) {

      // }
      const uniformLoc = gl.getUniformLocation(programHandle, uniformName);
      uniforms.add(new UniformGL2(uniformName, TypeConverterGL2.toUniformType(activeInfo.type),
       uniformLoc));
    }

    return uniforms;
  }

  static CorrectUniformName(name) {
    return name;
  }
}

export default ShaderProgramGL2;
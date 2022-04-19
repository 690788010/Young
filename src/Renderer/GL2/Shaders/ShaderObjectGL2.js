/**
 * ShaderObjectGL2类涵盖编译着色器代码的功能，能适用于顶点着色器、片元着色器等，所以能被复用
 */

import Disposable from "../../../Core/Disposable.js";
import Trig from "../../../Core/Trig.js";
import ShaderType from "../../Shaders/ShaderType.js";
import VertexLocations from "../../VertexArray/VertexLocations.js";

class ShaderObjectGL2 extends Disposable {
  constructor(gl, shaderType, source) {
    super();
    this._gl = gl;

    // 内置常量
    let builtinConstants = "#version 300 es \n";
    
    // 向顶点着色器添加内置常量
    if (shaderType === ShaderType.VertexShader) {
      builtinConstants += "#define og_posVertexLoc " + VertexLocations.Position + "\n";
      builtinConstants += "#define og_normalVertexLoc " + VertexLocations.Normal + "\n";
      builtinConstants += "#define og_texCoordVertexLoc " + VertexLocations.TextureCoordinate + "\n";
    }

    builtinConstants += "const float og_oneOverPi = " + Trig.OneOverPi + "\n";
    builtinConstants += "const float og_oneOverTwoPi = " + Trig.OneOverTwoPi + "\n";
    
      // 内置函数
    const builtinFunctions = "";

    let modifiedSource = "";
    // 确保着色器程序第一行是"#version 300 es"， 且仅有一行
    if (source.startsWith("#version")) {
      if (!source.startsWith("#version 300 es")) {
        throw new Error("Only GLSL ES version 300 is supported.");
      }
      modifiedSource = "//" + source;
    } else {
      modifiedSource = source;
    }

    const sources = builtinConstants + builtinFunctions + modifiedSource;

    /// 创建着色器对象
    this._shaderObject = this._gl.createShader(shaderType);
    // 向着色器对象中填充着色器程序的源代码
    this._gl.shaderSource(this._shaderObject, sources);
    // 编译着色器
    this._gl.compileShader(this._shaderObject);
    // 检查是否编译成功
    this._checkCompileErrors(this._shaderObject, shaderType);
  }

  _checkCompileErrors(shader, shaderType) {
    // 如果编译失败，则打印错误信息
    if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
      if (shaderType === ShaderType.VertexShader) {
        shaderType = "VERTEX";
      } else if (shaderType === ShaderType.FragmentShader) {
        shaderType = "FRAGMENT";
      }
      const infoLog = this._gl.getShaderInfoLog(shader);
      const msg = "ERROR::SHADER_COMPILATION_ERROR of type: " + shaderType + "\n" + infoLog + "\n -- --------------------------------------------------- -- ";
      window.alert(msg);
      throw new Error(msg);
    }
  }

  /**
   * 获取内置的 WebGLShader 对象
   * @returns {WebGLShader}
   */
  get Handle() {
    return this._shaderObject;
  }

  /**
   * 删除 WebGLShader对象
   */
  dispose() {
    if (this._shaderObject) {
      this._gl.deleteShader(this._shaderObject);
      this._shaderObject = null;
    }
  }
}

export default ShaderObjectGL2;
/**
 * ShaderObjectGL2类
 */

import Disposable from "../../../Core/Disposable.js";
import ShaderType from "../../Shaders/ShaderType.js";

class ShaderObjectGL2 extends Disposable {
  constructor(gl, shaderType, source) {
    super();

    // 内置常量
    const builtinConstants = "#version 300 es \n";
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
    this._shaderObject = gl.createShader(shaderType);
    // 向着色器对象中填充着色器程序的源代码
    gl.shaderSource(this._shaderObject, sources);
    // 编译着色器
    gl.compileShader(this._shaderObject);
    // 检查是否编译成功
    this._checkCompileErrors(gl, this._shaderObject, shaderType);
  }

  _checkCompileErrors(gl, shader, shaderType) {
    // 如果编译失败，则打印错误信息
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      if (shaderType === ShaderType.VertexShader) {
        shaderType = "VERTEX";
      } else if (shaderType === ShaderType.FragmentShader) {
        shaderType = "FRAGMENT";
      }
      const infoLog = gl.getShaderInfoLog(shader);
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
}

export default ShaderObjectGL2;
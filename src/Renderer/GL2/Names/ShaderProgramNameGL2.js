/**
 * ShaderProgramNameGL2类
 */

class ShaderProgramNameGL2 {
  constructor(gl) {
    // 创建一个 WebGLProgram 对象
    this._value = gl.createProgram();
  }

  /**
   * 获取内置的 WebGLProgram 对象
   * @returns {WebGLProgram}
   */
  get Value() {
    return this._value;
  }
}

export default ShaderProgramNameGL2;
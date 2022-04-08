/**
 * ShaderProgramNameGL2类
 */

class ShaderProgramNameGL2 {
  constructor(gl) {
    this._gl = gl;
    // 创建一个 WebGLProgram 对象
    this._value = this._gl.createProgram();
  }

  /**
   * 获取内置的 WebGLProgram 对象
   * @returns {WebGLProgram}
   */
  get Value() {
    return this._value;
  }

  /**
   * 删除 WebGLProgram对象
   */
  dispose() {
    if (this._value) {
      this._gl.deleteProgram(this._value);
      this._value;
    }
  }
}

export default ShaderProgramNameGL2;
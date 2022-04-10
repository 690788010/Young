/**
 * VertexArrayNameGL2类
 */

class VertexArrayNameGL2 {
  /**
   * 
   * @param {WebGL2RenderingContext} gl WebGL2的环境对象
   */
  constructor(gl) {
    this._gl = gl;
    this._value = gl.createVertexArray();
  }

  /**
   * @returns {WebGLVertexArrayObject}
   */
  get Value() {
    return this._value;
  }

  /**
   * 清除VAO
   */
  dispose() {
    if (this._value) {
      this._gl.deleteVertexArray(this._value);
      this._value = null;
    }
  }
}

export default VertexArrayNameGL2;
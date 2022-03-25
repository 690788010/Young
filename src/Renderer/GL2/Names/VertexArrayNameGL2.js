/**
 * VertexArrayNameGL2类
 */

class VertexArrayNameGL2 {
  /**
   * 
   * @param {WebGL2RenderingContext} gl WebGL2的环境对象
   */
  constructor(gl) {
    this._value = gl.createVertexArray();
  }

  get Value() {
    return this._value;
  }
}

export default VertexArrayNameGL2;
/**
 * BufferNameGL2类
 */

class BufferNameGL2 {
  /**
   * 构造函数
   * @param  {WebGL2RenderingContext} gl WebGL2环境对象
   */
  constructor(gl) {
    // 创建一个WebGLBuffer对象
    this._value = gl.createBuffer();
  }

  /**
   * 获取WebGLBuffer对象
   * @returns {WebGLBuffer}
   */
  get Value() {
    return this._value;
  }
}

export default BufferNameGL2;
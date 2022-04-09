/**
 * BufferNameGL2类
 */

class BufferNameGL2 {
  /**
   * 构造函数
   * @param  {WebGL2RenderingContext} gl WebGL2环境对象
   */
  constructor(gl) {
    this._gl = gl;
    // 创建一个WebGLBuffer对象
    this._value = this._gl.createBuffer();
  }

  /**
   * 获取WebGLBuffer对象
   * @returns {WebGLBuffer}
   */
  get Value() {
    return this._value;
  }

  /**
   * 删除WebGLBuffer对象
   */
  dispose() {
    if (this._value) {
      this._gl.deleteBuffer(this._value);
      this._value = null;
    }
  }
}

export default BufferNameGL2;
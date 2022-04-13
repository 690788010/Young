/**
 * SamplerNameGL2类
 */

class SamplerNameGL2 {
  /**
   * 构造方法
   * @param {WebGL2RenderingContext} gl 
   */
  constructor(gl) {
    this._gl = gl;

    this._value = this._gl.createSampler();   // WebGLSampler
  }

  /**
   * @returns {WebGLSampler}
   */
  get Value() {
    return this._value;
  }

  /**
   * 删除WebGLSampler
   */
  dispose() {
    if (this._value) {
      this._gl.deleteSampler(this._value);
      this._value = null;
    }
  }
}
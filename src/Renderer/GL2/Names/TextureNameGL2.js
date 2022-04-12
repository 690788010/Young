/**
 * TextureNameGL2类
 */

class TextureNameGL2 {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext}
   */
  constructor(gl) {
    this._gl = gl;
    // 创建一个 WebGLTexture 对象
    this._value = this._gl.createTexture();
  }

  /**
   * 查询纹理是否生成Mipmap
   * @returns {WebGLTexture}
   */
  get Value() {
    return this._value;
  }

  /**
   * 删除WebGLTexture
   */
  dispose() {
    if (!this._value) {
      this._gl.deleteTexture(this._value);
      this._value = null;
    }
  }
}

export default TextureNameGL2;
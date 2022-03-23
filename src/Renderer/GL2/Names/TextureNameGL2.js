/**
 * TextureNameGL2类
 */

class TextureNameGL2 {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext}
   */
  constructor(gl) {
    // 创建一个 WebGLTexture 对象
    this._value = gl.createTexture();
  }

  /**
   * 查询纹理是否生成Mipmap
   * @returns {WebGLTexture}
   */
  get Value() {
    return this._value;
  }
}

export default TextureNameGL2;
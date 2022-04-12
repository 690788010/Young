/**
 * Texture2DDescription类是二维纹理的描述类
 */

import TextureFormat from "./TextureFormat.js";

class Texture2DDescription {
  /**
   * 构造函数
   * @param  {Number} width 纹理的宽
   * @param  {Number} height 纹理的高
   * @param  {TextureFormat} format 纹理的internal format
   * @param  {Boolean} generateMipmaps 是否生成Mipmap
   */
  constructor(width, height, format, generateMipmaps = false) {
    this._width = width;
    this._height = height;
    this._format = format;
    this._generateMipmaps = generateMipmaps;
  }

  /**
   * 获取纹理的宽
   * @returns {Number}
   */
  get Width() {
    return this._width;
  }

  /**
   * 获取纹理的高
   * @returns {Number}
   */
  get Height() {
    return this._height;
  }

  /**
   * 获取纹理的internal format
   * @returns {TextureFormat}
   */
  get TextureFormat() {
    return this._format;
  }

  /**
   * 查询纹理是否生成Mipmap
   * @returns {TextureFormat}
   */
  get GenerateMipmaps() {
    return this._generateMipmaps;
  }
}

export default Texture2DDescription;
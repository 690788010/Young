/**
 * TextureUtility类
 */

import ImageFormat from "./ImageFormat.js";
import ImageDataType from "./ImageDataType.js";

class TextureUtility {
  /**
   * 计算基于特定行对齐方式图片所占的字节数
   * @param {Number} width 图片的宽度 
   * @param {Number} height 图片的高度
   * @param {ImageFormat} format 图片像素的数据格式 
   * @param {ImageDataType} dataType 图片像素的数据类型 
   * @param {Number} rowAlignment 行对齐的字节数
   * @returns {Number}
   */
  static RequiredSizeInBytes(width, height, format, dataType, rowAlignment) {
    // 图片实际的一行像素所占的空间
    let rowSize = width * this.NumberOfChannels(format) * this.SizeInBytes(dataType);

    const remainder = rowSize % rowAlignment;
    // 因为字节对齐而图片一行像素所占的空间
    rowSize += (rowAlignment - remainder) % rowAlignment;

    return rowSize * height;
  }

  /**
   * 计算ImageFormat的颜色通道数
   * @param {ImageFormat} format 图片像素的数据格式 
   * @returns {Number}
   */
  static NumberOfChannels(format) {
    switch(format) {
      case ImageFormat.RGB:
        return 3;
      case ImageFormat.RGBA:
        return 4;
    }
    throw new Error("format");
  }

  /**
   * 计算ImageDataType对应的字节数
   * @param {ImageDataType} dataType 图片像素的数据类型
   * @returns {Number}
   */
  static SizeInBytes(dataType) {
    switch(dataType) {
      case ImageDataType.UNSIGNED_BYTE:
        return 1;
    }
    throw new Error("dataType");
  }
}

export default TextureUtility;
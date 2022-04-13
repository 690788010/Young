/**
 * Texture2D用以表示二维纹理，它是一个抽象类
 */

import Disposable from "../../Core/Disposable.js";
import WritePixelBuffer from "../Buffers/WritePixelBuffer.js";
import ImageFormat from "./ImageFormat.js";
import ImageDataType from "./ImageDataType.js";

class Texture2D extends Disposable{

  /**
   * 
   * @param {WritePixelBuffer} pixelBuffer 
   * @param {ImageFormat} format 图片像素的数据格式 
   * @param {ImageDataType} dataType 图片像素的数据类型
   * @param {Number} rowAlignment 行对齐的字节数
   */
  copyFromBuffer(pixelBuffer, format, dataType, rowAlignment = 4) {
    this._copyFromBuffer(pixelBuffer, 0, 0, this.Description.Width, this.Description.Height, format, dataType, rowAlignment);
  }

  /**
   * 抽象方法
   * @param {WritePixelBufferGL2} pixelBuffer 
   * @param {Number} xOffset 纹理局部更新子矩形左下角x坐标
   * @param {Number} yOffset 纹理局部更新子矩形左下角y坐标
   * @param {Number} width 纹理局部更新子矩形宽度
   * @param {Number} height 纹理局部更新子矩形高度
   * @param {ImageFormat} format 图片像素的数据格式 
   * @param {ImageDataType} dataType 图片像素的数据类型 
   * @param {Number} rowAlignment 行对齐的字节数
   */
   _copyFromBuffer(pixelBuffer, xOffset, yOffset, width, height, format, dataType, rowAlignment) {}

  /**
   * 抽象方法
   */
  dispose() {}
}

export default Texture2D;
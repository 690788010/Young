/**
 * WritePixelBuffer类表示像素缓冲区，用于在系统内存和纹理之间传输数据
 * WritePixelBuffer类是一个抽象类
 */

import Disposable from "../../Core/Disposable.js";
import PixelBufferHint from "./PixelBufferHint.js";

class WritePixelBuffer extends Disposable {
  
  /**
   * 从系统内存拷贝数据到显卡缓冲区
   * @param {Typed Array} bufferInSystemMemory 类型化数组
   * @param {Number} destinationOffsetInBytes 目的缓冲区中数据起始偏移量，单位字节
   * @param {Number} lengthInBytes 从源数据要复制多少字节数据到显卡缓冲区
   */
  copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes = 0, lengthInBytes = bufferInSystemMemory.byteLength) {
    this._copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes, lengthInBytes);
  }

  /**
   * 抽象方法，从系统内存拷贝数据到显卡缓冲区
   * @param {Typed Array} bufferInSystemMemory 类型化数组
   * @param {Number} destinationOffsetInBytes 目的缓冲区中数据起始偏移量，单位字节
   * @param {Number} lengthInBytes 从源数据要复制多少字节数据到显卡缓冲区
   */
  _copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes, lengthInBytes) {}

  /**
   * 抽象方法
   * @returns {Number}
   */
  get SizeInBytes() {}

  /**
   * @returns {PixelBufferHint}
   */
  get UsageHint() {}

  /**
   * 抽象方法
   */
  dispose() {}
}

export default WritePixelBuffer;
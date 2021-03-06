/**
 * VertexBuffer类是表示顶点缓冲区的抽象类
 */

import Disposable from "../../Core/Disposable.js";
import BufferHint from "./BufferHint.js";

class VertexBuffer extends Disposable {

  /**
   * 抽象方法
   * @returns {Number}
   */
   get SizeInBytes() {}

   /**
    * 抽象方法
    * @returns {BufferHint}
    */
   get UsageHint() {}

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
   * 抽象方法，删除缓冲区
   */
  dispose() {}
}

export default VertexBuffer;
/**
 * IndexBufferGL2类是IndexBuffer抽象类基于OpenGL的实现类
 * IndexBuffer类是表示索引缓冲区的抽象类
 */

import IndexBuffer from "../../Buffers/IndexBuffer.js";
import BufferTarget from "../../Buffers/BufferTarget.js";
import BufferGL2 from "./BufferGL2.js";
import IndexBufferDataType from "../../Buffers/IndexBufferDataType.js";

class IndexBufferGL2 extends IndexBuffer {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext} gl
   * @param  {String} usageHint 缓冲区的usage参数，BufferHint的枚举项
   * @param  {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   */
  constructor(gl, usageHint, sizeInBytes) {
    super();
    this._count = 0;  // 缓冲区中索引的数量
    // 索引的数据类型
    this._dataType = IndexBufferDataType.UnsignedShort;
    this._bufferObject = new BufferGL2(gl, BufferTarget.ElementArrayBuffer, usageHint, sizeInBytes);
  }

  /**
   * 绑定索引缓冲区
   */
  bind() {
    this._bufferObject.bind();
  }

  /**
   * 解绑索引缓冲区
   */
  unBind() {
    this._bufferObject.unbind();
  }

  /**
   * @returns {Number}
   */
  get Count() {
    return this._count;
  } 

  /**
   * 
   * @returns {IndexBufferDataType}
   */
  get DataType() {
    return this._dataType;
  }

  /**
   * 缓冲区的大小
   * @returns {Number}
   */
   get SizeInBytes() {
    return this._bufferObject.SizeInBytes;
  }

  /**
    * 缓冲区的Usage参数，BufferHint的枚举项
    * @returns {BufferHint}
    */
  get UsageHint() {
    return this._bufferObject.UsageHint;
  }  

  /**
   * 从系统内存拷贝数据到显卡缓冲区
   * @param {Typed Array} bufferInSystemMemory 类型化数组
   * @param {Number} destinationOffsetInBytes 目的缓冲区中数据起始偏移量，单位字节
   * @param {Number} lengthInBytes 从源数据要复制多少字节数据到显卡缓冲区
   */
  _copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes, lengthInBytes) {
    if (bufferInSystemMemory instanceof Uint16Array) {
      this._dataType = IndexBufferDataType.UnsignedShort;
    } else if (bufferInSystemMemory instanceof Uint32Array) {
      this._dataType = IndexBufferDataType.UnsignedInt;
    } else {
      throw new Error("bufferInSystemMemory must be an array of Uint16Array or UnsignedInt.");
    }
    // 缓冲区中索引的数量
    this._count = bufferInSystemMemory.length;
    this._bufferObject.copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes, lengthInBytes);
  }

  /**
   * 删除WebGLBuffer对象
   */
  dispose() {
    this._bufferObject.dispose();
  }
}

export default IndexBufferGL2;
/**
 * VertexBufferGL2类是VertexBuffer抽象类基于OpenGL的实现类
 * VertexBuffer类是表示顶点缓冲区的抽象类
 */


import BufferTarget from "../../Buffers/BufferTarget.js";
import VertexBuffer from "../../Buffers/VertexBuffer.js";
import BufferGL2 from "./BufferGL2.js";

class VertexBufferGL2 extends VertexBuffer {
  /**
   * 构造函数
   * @param  {WebGL2RenderingContext} gl
   * @param  {String} usageHint 缓冲区的usage参数，BufferHint的枚举项
   * @param  {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   */
  constructor(gl, usageHint, sizeInBytes) {
    super();

    this._bufferObject = new BufferGL2(gl, BufferTarget.ArrayBuffer, usageHint, sizeInBytes);
  }

  /**
   * 从系统内存拷贝数据到显卡缓冲区
   * @param {Typed Array} bufferInSystemMemory 类型化数组
   * @param {Number} destinationOffsetInBytes 目的缓冲区中数据起始偏移量，单位字节
   * @param {Number} lengthInBytes 从源数据要复制多少字节数据到显卡缓冲区
   */
   _copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes, lengthInBytes) {
    this._bufferObject.copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes, lengthInBytes);
  }

  /**
   * 绑定顶点缓冲区
   */
  bind() {
    this._bufferObject.bind();
  }
}

export default VertexBufferGL2;

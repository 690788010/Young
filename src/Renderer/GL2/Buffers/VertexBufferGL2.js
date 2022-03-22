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
   * @param  {String} usageHint 缓冲区的usage参数，BufferHint的枚举项
   * @param  {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   */
  constructor(usageHint, sizeInBytes) {
    this._bufferObject = new BufferGL2(BufferTarget.ArrayBuffer, usageHint, sizeInBytes);
  }

  /**
   * 绑定顶点缓冲区
   */
  bind() {
    this._bufferObject.bind();
  }
}

export default VertexBufferGL2;

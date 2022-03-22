/**
 * IndexBufferGL2类是IndexBuffer抽象类基于OpenGL的实现类
 * IndexBuffer类是表示索引缓冲区的抽象类
 */

import IndexBuffer from "../../Buffers/IndexBuffer.js";
import BufferTarget from "../../Buffers/BufferTarget.js";
import BufferGL2 from "./BufferGL2.js";

class IndexBufferGL2 extends IndexBuffer {
  /**
   * 构造函数
   * @param  {String} usageHint 缓冲区的usage参数，BufferHint的枚举项
   * @param  {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   */
  constructor(usageHint, sizeInBytes) {
    super();
    
    this._bufferObject = new BufferGL2(BufferTarget.ElementArrayBuffer, usageHint, sizeInBytes);
  }

  /**
   * 绑定索引缓冲区
   */
  bind() {
    this._bufferObject.bind();
  }
}

export default IndexBufferGL2;
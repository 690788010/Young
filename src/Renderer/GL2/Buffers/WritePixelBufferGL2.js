/**
 * WritePixelBufferGL2类是WritePixelBuffer类基于OpenGL的实现类
 * WritePixelBufferGL2类用于从系统内存传输数据到纹理
 */

import WritePixelBuffer from "../../Buffers/WritePixelBuffer";
import BufferHint from "../../Buffers/BufferHint.js";
import PixelBufferGL2 from "./PixelBufferGL2";
import BufferTarget from "../../Buffers/BufferTarget.js"

class WritePixelBufferGL2 extends WritePixelBuffer {
  /**
   * 构造函数
   * @param {BufferHint} usageHint 像素缓冲区的usage参数
   * @param {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   */
  constructor(usageHint, sizeInBytes) {
    super();

    this._bufferObject = new PixelBufferGL2(BufferTarget.PixelUnpackBuffer, usageHint, sizeInBytes);
    this._usageHint = usageHint;
  }

  /**
   * 解绑目标为gl.PIXEL_UNPACK_BUFFER的缓冲区
   */
  static UnBind() {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl.bindBuffer(BufferTarget.PixelUnpackBuffer, null);
  }
}

export default WritePixelBufferGL2;


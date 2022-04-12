/**
 * WritePixelBufferGL2类是WritePixelBuffer类基于OpenGL的实现类
 * WritePixelBufferGL2类用于从系统内存传输数据到纹理
 */

import WritePixelBuffer from "../../Buffers/WritePixelBuffer.js";
import BufferHint from "../../Buffers/BufferHint.js";
import PixelBufferGL2 from "./PixelBufferGL2.js";
import BufferTarget from "../../Buffers/BufferTarget.js"

class WritePixelBufferGL2 extends WritePixelBuffer {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext} gl
   * @param {BufferHint} usageHint 像素缓冲区的usage参数
   * @param {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   */
  constructor(gl, usageHint, sizeInBytes) {
    super();
    this._gl = gl;

    this._bufferObject = new PixelBufferGL2(this._gl.PIXEL_UNPACK_BUFFER, usageHint, sizeInBytes);
    this._usageHint = usageHint;
  }

  /**
   * 绑定像素缓冲区
   */
  bind() {
    this._bufferObject.bind();
  }

  /**
   * 解绑像素缓冲区
   */
  unBind() {
    this._gl.bindBuffer(this._gl.PIXEL_UNPACK_BUFFER, null);
  }
}

export default WritePixelBufferGL2;


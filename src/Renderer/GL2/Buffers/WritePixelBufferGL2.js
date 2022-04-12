/**
 * WritePixelBufferGL2类是WritePixelBuffer类基于OpenGL的实现类
 * WritePixelBufferGL2类用于从系统内存传输数据到纹理
 */

import WritePixelBuffer from "../../Buffers/WritePixelBuffer.js";
import BufferHint from "../../Buffers/BufferHint.js";
import PixelBufferGL2 from "./PixelBufferGL2.js";

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

    this._bufferObject = new PixelBufferGL2(this._gl, this._gl.PIXEL_UNPACK_BUFFER, usageHint, sizeInBytes);
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
   * 抽象方法
   * @returns {Number}
   */
  get SizeInBytes() {
    return this._bufferObject.SizeInBytes;
  }

  /**
   * @returns {PixelBufferHint}
   */
  get UsageHint() {
    return this._bufferObject.UsageHint;
  }
}

export default WritePixelBufferGL2;


/**
 * PixelBufferGL2类
 */

import BufferNameGL2 from "../Names/BufferNameGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";
import BufferHint from "../../Buffers/BufferHint.js";

class PixelBufferGL2 {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext} gl
   * @param {BufferTarget} type 像素缓冲区的绑定目标，例如gl.PIXEL_UNPACK_BUFFER
   * @param {BufferHint} usageHint 像素缓冲区的usage参数
   * @param {Number} sizeInBytes 像素缓冲区的大小（以字节为单位）
   */
  constructor(gl, type, usageHint, sizeInBytes) {
    this._gl = gl;

    if (sizeInBytes <= 0) {
      throw new Error("sizeInBytes must be greater than zero.");
    }

    this._name = new BufferNameGL2(this._gl);

    this._type = type;
    this._sizeInBytes = sizeInBytes;
    this._usageHint = usageHint;

    //
    // Allocating here with GL.BufferData, then writing with GL.BufferSubData
    // in CopyFromSystemMemory() should not have any serious overhead:
    //
    //   http://www.opengl.org/discussion_boards/ubbthreads.php?ubb=showflat&Number=267373#Post267373
    //
    // Alternately, we can delay GL.BufferData until the first
    // CopyFromSystemMemory() call.
    //
    this.bind();    // 绑定缓冲区
    gl.bufferData(this._type, this._sizeInBytes, TypeConverterGL2.BufferHintTo(this._usageHint));  // 初始化缓冲区的数据存储区
  }

  /**
   * 绑定像素缓冲区
   */
  bind() {
    this._gl.bindBuffer(this._type, this._name.Value);
  }

  /**
   * 从系统内存拷贝数据到显卡缓冲区
   * @param {Typed Array} bufferInSystemMemory 类型化数组
   * @param {Number} destinationOffsetInBytes 目的缓冲区中数据起始偏移量，单位字节
   * @param {Number} lengthInBytes 从源数据要复制多少字节数据到显卡缓冲区
   */
  copyFromSystemMemory(bufferInSystemMemory, destinationOffsetInBytes, lengthInBytes) {
    if (destinationOffsetInBytes < 0) {
      throw new Error("destinationOffsetInBytes must be greater than or equal to zero.");
    }
    // 不能超过已分配的显卡缓冲区大小
    if (destinationOffsetInBytes + lengthInBytes > this._sizeInBytes) {
      throw new Error("destinationOffsetInBytes + lengthInBytes must be less than or equal to SizeInBytes.");
    }
    if (lengthInBytes < 0) {
      throw new Error("lengthInBytes must be greater than or equal to zero.");
    }
    if (lengthInBytes > bufferInSystemMemory.byteLength) {
      throw new Error("lengthInBytes must be less than or equal to the size of bufferInSystemMemory in bytes.");
    }

    this.bind();
    this._gl.bufferSubData(this._type, destinationOffsetInBytes, bufferInSystemMemory, 0, (lengthInBytes / bufferInSystemMemory.BYTES_PER_ELEMENT));
  }

  /**
   * @returns {Number}
   */
  get SizeInBytes() {
    return this._sizeInBytes;
  }

   /**
    * @returns {PixelBufferHint}
    */
  get UsageHint() {
    return this._usageHint;
  }
}

export default PixelBufferGL2;
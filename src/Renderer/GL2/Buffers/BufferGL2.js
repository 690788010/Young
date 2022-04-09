/**
 * BufferGL2类
 */

import BufferNameGl2 from "../Names/BufferNameGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";
import BufferHint from "../../Buffers/BufferHint.js";

class BufferGL2 {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext} gl
   * @param  {Number} type 缓冲区的绑定目标，BufferTarget枚举的某一项
   * @param  {String} usageHint 缓冲区的usage参数，BufferHint的枚举项
   * @param  {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   */
  constructor(gl, type, usageHint, sizeInBytes) {
    if (sizeInBytes <= 0) {
      throw new Error("sizeInBytes must be greater than zero.");
    }
    this._gl = gl;
    
    this._name = new BufferNameGl2(this._gl);
    this._type = type;
    this._sizeInBytes = sizeInBytes;
    this._usageHint = usageHint;

    this._gl.bindVertexArray(null);  // 解绑VAO
    this.bind();      // 绑定缓冲区
    // 初始化缓冲区
    this._gl.bufferData(this._type, this._sizeInBytes, TypeConverterGL2.BufferHintTo(this._usageHint));
  }

  /**
   * 绑定缓冲区
   * @param  {WebGL2RenderingContext} gl WebGL2的环境对象
   */
  bind() {
    this._gl.bindBuffer(this._type, this._name.Value);
  }

  /**
   * 获取BufferNameGl2对象
   * @returns {BufferNameGl2}
   */
  get Handle() {
    return this._name;
  }

  /**
   * 获取缓冲区的大小（以字节为单位）
   * @returns {Number}
   */
  get SizeInBytes() {
    return this._sizeInBytes;
  }

  /**
   * 缓冲区的usage参数，BufferHint的枚举项
   * @returns {BufferHint}
   */
  get UsageHint() {
    return this._usageHint;
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

    this._gl.bindVertexArray(null);
    this.bind();
    this._gl.bufferSubData(this._type, destinationOffsetInBytes, bufferInSystemMemory, 0, (lengthInBytes / bufferInSystemMemory.BYTES_PER_ELEMENT));
  }

  /**
   * 删除WebGLBuffer对象
   */
  dispose() {
    this._name.dispose();
  }
}

export default BufferGL2;
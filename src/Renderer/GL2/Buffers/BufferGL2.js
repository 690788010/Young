/**
 * BufferGL2类
 */

import BufferNameGl2 from "../Names/BufferNameGL2.js";
import TypeConverterGL3x from "../TypeConverterGL3x.js";

class BufferGL2 {
  /**
   * 构造函数
   * @param  {Number} type 缓冲区的绑定目标，BufferTarget枚举的某一项
   * @param  {String} usageHint 缓冲区的usage参数，BufferHint的枚举项
   * @param  {Number} sizeInBytes 缓冲区的大小（以字节为单位）
   * @returns {VertexBufferGL2}
   */
  constructor(type, usageHint, sizeInBytes) {
    if (sizeInBytes <= 0) {
      throw new Error("sizeInBytes must be greater than zero.");
    }

    const gl = document.createElement("canvas").getContext("webgl2");
    
    this._name = new BufferNameGl2(gl);
    this._sizeInBytes = sizeInBytes;
    this._type = type;
    this._usageHint = TypeConverterGL3x.BufferHintTo(usageHint);

    gl.bindVertexArray(null);
    this.bind();      // 绑定缓冲区
    gl.bufferData(this._type, this._sizeInBytes, this._usageHint);
  }

  /**
   * 绑定缓冲区
   * @param  {WebGL2RenderingContext} gl WebGL2的环境对象
   */
  bind(gl) {
    gl.bindBuffer(this.type, this._name.Value);
  }
}

export default BufferGL2;
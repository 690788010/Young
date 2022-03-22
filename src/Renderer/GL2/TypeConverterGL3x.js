/**
 * TypeConverterGL3x
 */

import BufferHint from "../Buffers/BufferHint.js";
import ShaderVertexAttributeType from "../Shaders/ShaderVertexAttributeType.js";

class TypeConverterGL3x {
  /**
   * 将着色器Attribute变量的类型映射为自定义的类型
   * @param  {Number} type
   */
  static AttributeTo(type) {
    switch (type) {
      case 35666: 
        return ShaderVertexAttributeType.FloatVector4;
    }
  }

  /**
   * 将缓冲区的usage参数映射为BufferHint枚举的对应类型
   * @param  {Number} hint 缓冲区的usage参数，例如gl.STATIC_DRAW
   */
  static BufferUsageHintTo(hint) {
    const gl = document.createElement("canvas").getContext("webgl2");
    switch (hint) {
      case gl.STREAM_DRAW:
        return BufferHint.StreamDraw;
    }
  }

  /**
   * BufferHint的枚举项映射为缓冲区的usage参数
   * @param  {Number} hint BufferHint的枚举项
   * @returns {Number} 缓冲区的usage参数，例如gl.STREAM_DRAW
   */
  static BufferHintTo(hint) {
    const gl = document.createElement("canvas").getContext("webgl2");
    switch (hint) {
      case "StreamDraw":
        return gl.STREAM_DRAW;
    }
  }
}

export default TypeConverterGL3x;
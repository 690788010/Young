/**
 * TypeConverterGL2
 */

import BufferHint from "../Buffers/BufferHint.js";
import ShaderVertexAttributeType from "../Shaders/ShaderVertexAttributeType.js";
import UniformType from "../Shaders/UniformType.js";
import TextureFormat from "../Textures/TextureFormat.js";

class TypeConverterGL2 {
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
      case gl.STATIC_DRAW:
        return BufferHint.StaticDraw;
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
      case "StaticDraw":
        return gl.STATIC_DRAW;
    }
  }

  /**
   * TextureFormat的枚举项映射为WebGL2的纹理internalformat
   * @param  {TextureFormat} format TextureFormat的枚举项
   * @returns {PixelInternalFormat} WebGL2的纹理internalformat
   */
  static TextureFormatTo(format) {
    const gl = document.createElement("canvas").getContext("webgl2");
    switch (format) {
      case TextureFormat.RedGreenBlue8:
        return gl.RGB8;
    }
  }

  /**
   * TextureFormat的枚举项映射为WebGL2的纹理format
   * @param {TextureFormat} textureFormat TextureFormat的枚举项
   * @returns {}
   */
  static TextureToPixelFormat(textureFormat) {
    // if (!IsTextureFormatValid(textureFormat)){
    //     throw new ArgumentException("Invalid texture format.", "textureFormat");
    // }
    const gl = document.createElement("canvas").getContext("webgl2");
    switch (textureFormat) {
      case TextureFormat.RedGreenBlue8:
      case TextureFormat.RedGreenBlue16:
        return gl.RGB8;
    }
  }
  
  static TextureToPixelType(textureFormat) {
    // if (!IsTextureFormatValid(textureFormat)) {
    //     throw new ArgumentException("Invalid texture format.", "textureFormat");
    // }
    const gl = document.createElement("canvas").getContext("webgl2");
    switch(textureFormat) {
      case TextureFormat.RedGreenBlue8:
        return gl.UNSIGNED_BYTE;
    }
  }

  /**
   * 将WebGL的Uniform变量的类型映射为UniformType对应的类型
   * @param {Number} type Uniform变量的类型，例如gl.FLOAT
   * @returns {UniformType}
   */
  static toUniformType(type) {
    const gl = document.createElement("canvas").getContext("webgl2");
    switch(type) {
      case gl.INT:
        return UniformType.Int;
      case gl.FLOAT:
        return UniformType.Float;
      case gl.FLOAT_MAT4:
        return UniformType.FloatMatrix44;
    }
    throw new Error("An implementation for uniform type " + type + " does not exist.");
  }
}

export default TypeConverterGL2;
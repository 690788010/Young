/**
 * TypeConverterGL2
 */

import PrimitiveType from "../../Core/Geometry/PrimitiveType.js";
import BufferHint from "../Buffers/BufferHint.js";
import ShaderVertexAttributeType from "../Shaders/ShaderVertexAttributeType.js";
import UniformType from "../Shaders/UniformType.js";
import TextureFormat from "../Textures/TextureFormat.js";
import ComponentDatatype from "../VertexArray/ComponentDatatype.js";
import DepthTestFunction from "../RenderState/DepthTestFunction.js";
import CullFace from "../RenderState/CullFace.js";
import WindingOrder from "../../Core/Geometry/WindingOrder.js";
import ClearBuffers from "../ClearState/ClearBuffers.js";
import IndexBufferDataType from "../Buffers/IndexBufferDataType.js";
import ImageFormat from "../Textures/ImageFormat.js";
import ImageDataType from "../Textures/ImageDataType.js";
import BufferNameGL2 from "./Names/BufferNameGL2.js";
import TextureMinificationFilter from "../Textures/TextureMinificationFilter.js";
import TextureMagnificationFilter from "../Textures/TextureMagnificationFilter.js";
import TextureWrap from "../Textures/TextureWrap.js";

const gl = document.createElement("canvas").getContext("webgl2");

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
    switch (format) {
      case TextureFormat.RGBA:
        return gl.RGBA;
      case TextureFormat.RGBA8:
        return gl.RGBA8;
      case TextureFormat.RedGreenBlue8:
        return gl.RGB8;
    }
    throw new Error("TextureFormat");
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
    switch (textureFormat) {
      case TextureFormat.RGBA:
        return gl.RGBA;
      case TextureFormat.RGBA8:
        return gl.RGBA8;
      case TextureFormat.RedGreenBlue8:
      case TextureFormat.RedGreenBlue16:
        return gl.RGB8;
    }
  }
  
  static TextureToPixelType(textureFormat) {
    // if (!IsTextureFormatValid(textureFormat)) {
    //     throw new ArgumentException("Invalid texture format.", "textureFormat");
    // }
    switch(textureFormat) {
      case TextureFormat.RGBA:
        return gl.UNSIGNED_BYTE;
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
    switch(type) {
      case gl.INT:
        return UniformType.Int;
      case gl.FLOAT:
        return UniformType.Float;
      case gl.FLOAT_VEC2:
        return UniformType.FloatVector2;
      case gl.FLOAT_VEC3:
        return UniformType.FloatVector3;
      case gl.FLOAT_VEC4:
        return UniformType.FloatVector4;
      case gl.FLOAT_MAT4:
        return UniformType.FloatMatrix44;
      case gl.SAMPLER_2D:
        return UniformType.Sampler2D;
    }
    throw new Error("An implementation for uniform type " + type + " does not exist.");
  }

  /**
   * 将PrimitiveType枚举类型映射为WebGL的图元类型
   * @param {PrimitiveType} type
   * @param {Number} 
   */
  static PrimitiveTypeTo(type) {
    switch(type) {
      case PrimitiveType.Points:
        return gl.POINTS;
      case PrimitiveType.Lines:
        return gl.LINES;
      case PrimitiveType.LineLoop:
        return gl.LINE_LOOP;
      case PrimitiveType.LineStrip:
        return gl.LINE_STRIP;
      case PrimitiveType.Triangles:
        return gl.TRIANGLES;
    }
    throw new Error("An implementation for primitive type " + type + " does not exist.");
  }

  /**
   * 
   * @param {ComponentDatatype} type 
   */
  static ComponentDataTypeTo(type) {
    switch(type) {
      case ComponentDatatype.Float:
        return gl.FLOAT
    }
    throw new Error("type");
  }

  /**
   * 
   * @param {ClearBuffers} mask 
   * @returns 
   */
  static ClearBuffersToGL(mask) {
    switch(mask) {
      case ClearBuffers.ColorBuffer:
        return gl.COLOR_BUFFER_BIT;
      case ClearBuffers.DepthBuffer:
        return gl.DEPTH_BUFFER_BIT;
      case ClearBuffers.StencilBuffer:
        return gl.STENCIL_BUFFER_BIT;
      case ClearBuffers.ColorAndDepthBuffer:
        return gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
      case ClearBuffers.All:
        return gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT;
    }
  }

  /**
   * 
   * @param {IndexBufferDataType} type 
   */
  static IndexDataTypeToGL(type) {
    switch(type) {
      case IndexBufferDataType.UnsignedShort:
        return gl.UNSIGNED_SHORT;
      case IndexBufferDataType.UnsignedInt:
        return gl.UNSIGNED_INT;
    }
  }

  /**
   * 
   * @param {ImageFormat} format 
   * @returns {GLenum}
   */
  static ImageFormatToGL(format) {
    switch(format) {
      case ImageFormat.RGB:
        return gl.RGB;
      case ImageFormat.RGBA:
        return gl.RGBA;
    }
    throw new Error("ImageFormat");
  }

  /**
   * 
   * @param {ImageDataType} type 
   * @returns {GLenum}
   */
  static ImageDataTypeToGL(type) {
    switch(type) {
      case ImageDataType.UNSIGNED_BYTE:
        return gl.UNSIGNED_BYTE;
    }
    throw new Error("ImageDataType");
  }

  /**
   * 
   * @param {TextureMinificationFilter} filter 
   * @param {GLenum}
   */
  static TextureMinFilterToGL(filter) {
    switch(filter) {
      case TextureMinificationFilter.LINEAR:
        return gl.LINEAR;
      case TextureMinificationFilter.NEAREST:
        return gl.NEAREST;
      case TextureMinificationFilter.NEAREST_MIPMAP_NEAREST:
        return gl.NEAREST_MIPMAP_NEAREST;
      case TextureMinificationFilter.LINEAR_MIPMAP_NEAREST:
        return gl.LINEAR_MIPMAP_NEAREST;
      case TextureMinificationFilter.NEAREST_MIPMAP_LINEAR:
        return gl.NEAREST_MIPMAP_LINEAR;
      case TextureMinificationFilter.LINEAR_MIPMAP_LINEAR:
        return gl.LINEAR_MIPMAP_LINEAR
    }
    throw new Error("TextureMinificationFilter");
  }

  /**
   * 
   * @param {TextureMagnificationFilter} filter 
   * @returns {GLenum} 
   */
  static TextureMagFilterToGL(filter) {
    switch(filter) {
      case TextureMagnificationFilter.NEAREST:
        return gl.NEAREST;
      case TextureMagnificationFilter.LINEAR:
        return gl.LINEAR;
    }
    throw new Error("TextureMagnificationFilter")
  }

  /**
   * 
   * @param {TextureWrap} wrap 
   * @returns {GLenum}
   */
  static TextureWrapToGL(wrap) {
    switch(wrap) {
      case TextureWrap.CLAMP_TO_EDGE:
        return gl.CLAMP_TO_EDGE;
      case TextureWrap.REPEAT:
        return gl.REPEAT;
      case TextureWrap.MIRRORED_REPEAT:
        return gl.MIRRORED_REPEAT;
    }
  } 
}

export default TypeConverterGL2;
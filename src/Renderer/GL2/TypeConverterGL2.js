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
    switch(type) {
      case gl.INT:
        return UniformType.Int;
      case gl.FLOAT:
        return UniformType.Float;
      case gl.FLOAT_VEC3:
        return UniformType.FloatVector3;
      case gl.FLOAT_MAT4:
        return UniformType.FloatMatrix44;
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
        return gl.Points;
      case PrimitiveType.Lines:
        return gl.Lines;
      case PrimitiveType.LineLoop:
        return gl.LineLoop;
      case PrimitiveType.LineStrip:
        return gl.LineStrip;
      case PrimitiveType.Triangles:
        return gl.Triangles;
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

  static DepthTestFunctionToGL(depthTestFunction) {
    switch(depthTestFunction) {
      case DepthTestFunction.NEVER:
        return gl.NEVER;
      case DepthTestFunction.LESS:
        return gl.LESS;
      case DepthTestFunction.EQUAL:
        return gl.EQUAL;
      case DepthTestFunction.LEQUAL:
        return gl.LEQUAL;
      case DepthTestFunction.GREATER:
        return gl.GREATER;
      case DepthTestFunction.NOTEQUAL:
        return gl.NOTEQUAL;
      case DepthTestFunction.GEQUAL:
        return gl.GEQUAL;
      case DepthTestFunction.ALWAYS:
        return gl.ALWAYS;
    }
    throw new Error("function");
  }

  static CullFaceModeToGL(cullFace) {
    switch(cullFace) {
      case CullFace.FRONT:
        return gl.FRONT;
      case CullFace.BACK:
        return gl.BACK;
      case CullFace.FRONT_AND_BACK:
        return gl.FRONT_AND_BACK;
    }
    throw new Error("cull face");
  }

  static FrontFaceDirectionToGL(windingOrder) {
    switch(windingOrder) {
      case WindingOrder.CW:
        return gl.CW;
      case WindingOrder.CCW:
        return gl.CCW;
    }
    throw new Error("windingOrder");
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
}

export default TypeConverterGL2;
import Device from "../../Device.js";
import Texture2D from "../../Textures/Texture2D.js";
import Texture2DDescription from "../../Textures/Texture2DDescription.js";
import TextureNameGL2 from "../Names/TextureNameGL2.js";
import WritePixelBufferGL2 from "../Buffers/WritePixelBufferGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";
import ImageFormat from "../../Textures/ImageFormat.js";
import ImageDataType from "../../Textures/ImageDataType.js";
import TextureUtility from "../../Textures/TextureUtility.js";


class Texture2DGL2 extends Texture2D {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext} gl
   * @param  {Texture2DDescription} description 二维纹理的描述
   * @param  {TextureTarget} textureTarget 纹理的绑定目标，例如gl.TEXTURE_2D  
   */
  constructor(gl, description, textureTarget) {
    super();
    this._gl = gl;

    if (description.Width <= 0) {
      throw new Error("description.Width must be greater than zero.");
    }

    if (description.Height <= 0) {
      throw new Error("description.Height must be greater than zero.");
    }

    if (description.GenerateMipmaps) {

    }

    this._name = new TextureNameGL2(this._gl);
    this._target = textureTarget;
    this._description = description;
    // 最后一个纹理单元
    this._lastTextureUnit = this._gl.TEXTURE0 + (Device.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1);
    // this._lastTextureUnit = this._gl.TEXTURE0;

    //
    // TexImage2D is just used to allocate the texture so a PBO can't be bound.
    //
    this._gl.bindBuffer(this._gl.PIXEL_UNPACK_BUFFER, null);
    // 绑定到最后一个纹理单元
    this.bindToLastTextureUnit();
    // 指定二维纹理图像
    this._gl.texImage2D(this._target, 0, 
      TypeConverterGL2.TextureFormatTo(this._description.TextureFormat),
      this._description.Width,
      this._description.Height,
      0,
      TypeConverterGL2.TextureToPixelFormat(this._description.TextureFormat),
      TypeConverterGL2.TextureToPixelType(this._description.TextureFormat),
      null);
  }

  /**
   * 绑定纹理
   * @param {WebGL2RenderingContext} gl 
   */
  bind() {
    this._gl.bindTexture(this._target, this._name.Value);
  }

  /**
   * 解绑纹理
   */
  static UnBind() {
    this._gl.bindTexture(this._target, null);
  }

  /**
   * 
   * @param {WritePixelBufferGL2} pixelBuffer 
   * @param {Number} xOffset 纹理局部更新子矩形左下角x坐标
   * @param {Number} yOffset 纹理局部更新子矩形左下角y坐标
   * @param {Number} width 纹理局部更新子矩形宽度
   * @param {Number} height 纹理局部更新子矩形高度
   * @param {ImageFormat} format 图片像素的数据格式 
   * @param {ImageDataType} dataType 图片像素的数据类型 
   * @param {Number} rowAlignment 行对齐的字节数
   */
  _copyFromBuffer(pixelBuffer, xOffset, yOffset, width, height, format, dataType, rowAlignment) {
    if (pixelBuffer.SizeInBytes < TextureUtility.RequiredSizeInBytes(
      width, height, format, dataType, rowAlignment)) 
    {
      throw new Error("Pixel buffer is not big enough for provided width, height, format, and datatype.");
    }
    if (xOffset < 0) {
      throw new Error("xOffset must be greater than or equal to zero.");
    }
    if (yOffset < 0) {
      throw new Error("yOffset must be greater than or equal to zero.");
    }
    if (xOffset + width > this._description.Width) {
      throw new Error("xOffset + width must be less than or equal to Description.Width.");
    }
    if (yOffset + height > this._description.Height) {
      throw new Error("yOffset + height must be less than or equal to Description.Height.");
    }

    // 验证行对齐字节数是否合法
    this._verifyRowAlignment(rowAlignment);

    pixelBuffer.bind();
    this.bindToLastTextureUnit();
    this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, rowAlignment);
    this._gl.texSubImage2D(this._target, 0,
      xOffset,
      yOffset,
      width,
      height,
      TypeConverterGL2.ImageFormatToGL(format),
      TypeConverterGL2.ImageDataTypeToGL(dataType),
      0);
    this._generateMipmaps();
  }

  /**
   * 验证行对齐字节数是否合法
   * @param {Number} rowAlignment  行对齐字节数
   */
  _verifyRowAlignment(rowAlignment) {
    if ((rowAlignment !== 1) &&
        (rowAlignment !== 2) &&
        (rowAlignment !== 4) &&
        (rowAlignment !== 8))
    {
      throw new Error("rowAlignment is illegal.");
    }
  }

  /**
   * 生成Mipmap
   */
  _generateMipmaps() {
    if (this._description.GenerateMipmaps) {
      this._gl.generateMipmap(this._gl.TEXTURE_2D);
    }
  }

  /**
   * 激活最后一个纹理单元，并将纹理绑定到目标
   */
  bindToLastTextureUnit() {
    this._gl.activeTexture(this._lastTextureUnit);  // 激活最后一个纹理单元
    this.bind();
  }

  /**
   * @returns {TextureNameGL2}
   */
  get Handle() {
    return this._name;
  }

  /**
   * @returns {TextureTarget}
   */
  get Target() {
    return this._target;
  }

  /**
   * @returns {Description}
   */
  get Description() {
    return this._description;
  }
}

export default Texture2DGL2;
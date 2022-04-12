import Device from "../../Device.js";
import Texture2D from "../../Textures/Texture2D.js";
import Texture2DDescription from "../../Textures/Texture2DDescription.js";
import TextureNameGL2 from "../Names/TextureNameGL2.js";
import WritePixelBufferGL2 from "../Buffers/WritePixelBufferGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";


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
    this._lastTextureUnit = this._gl.TEXTURE0 + (Device.NumberOfTextureUnits - 1);

    //
    // TexImage2D is just used to allocate the texture so a PBO can't be bound.
    //
    this._gl.bindBuffer(this._gl.PIXEL_UNPACK_BUFFER, null);
    // 绑定到最后一个纹理单元
    this.bindToLastTextureUnit();
    // 指定二维纹理图像
    gl.texImage2D(this._target, 0, 
      TypeConverterGL2.TextureFormatTo(this._description.TextureFormat),
      this._description.Width,
      this._description.Height,
      0,
      TypeConverterGL2.TextureToPixelFormat(this._description.TextureFormat),
      TypeConverterGL2.TextureToPixelType(this._description.TextureFormat),
      null
    );
  }

  /**
   * 绑定纹理
   * @param {WebGL2RenderingContext} gl 
   */
  bind() {
    this._gl.bindTexture(this._target, this._name.Value);
  }


  /**
   * 激活最后一个纹理单元，并将纹理绑定到目标
   */
  bindToLastTextureUnit() {
    this._gl.activeTexture(this._lastTextureUnit);  // 激活最后一个纹理单元
    this.bind();
  }
}

export default Texture2DGL2;
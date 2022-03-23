import Device from "../../Device";
import Texture2D from "../../Textures/Texture2D";
import Texture2DDescription from "../../Textures/Texture2DDescription";
import TextureNameGL2 from "../Names/TextureNameGL2";
import WritePixelBufferGL2 from "../Buffers/WritePixelBufferGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2";


class Texture2DGL2 extends Texture2D {
  /**
   * 构造函数
   * @param  {Texture2DDescription} description 二维纹理的描述
   * @param  {TextureTarget} textureTarget 纹理的绑定目标，例如gl.TEXTURE_2D  
   */
  constructor(description, textureTarget) {
    super();

    if (description.Width <= 0) {
      throw new Error("description.Width must be greater than zero.");
    }

    if (description.Height <= 0) {
      throw new Error("description.Height must be greater than zero.");
    }

    if (description.GenerateMipmaps) {

    }

    const gl = document.createElement("canvas").getContext("webgl2");
    this._name = new TextureNameGL2(gl);
    this._target = textureTarget;
    this._description = description;
    this._lastTextureUnit = gl.TEXTURE0 + (Device.NumberOfTextureUnits - 1);

    //
    // TexImage2D is just used to allocate the texture so a PBO can't be bound.
    //
    WritePixelBufferGL2.UnBind();
    this.bindToLastTextureUnit(gl);
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
  bind(gl) {
    gl.bindTexture(this._target, this._name.Value);
  }


  /**
   * 激活最后一个纹理单元，并将纹理绑定到目标
   */
  bindToLastTextureUnit(gl) {
    gl.activeTexture(this._lastTextureUnit);  // 激活最后一个纹理单元
    this.bind(gl);
  }
}

export default Texture2DGL2;
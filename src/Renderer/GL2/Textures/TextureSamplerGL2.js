/**
 * TextureSamplerGL2类是TextureSampler抽象类基于WebGL2的实现类
 * TextureSampler类是一个抽象类，它用于表示纹理的采样器
 */

import TextureSampler from "../../Textures/TextureSampler";
import TextureMinificationFilter from "../../Textures/TextureMinificationFilter.js";
import TextureMagnificationFilter from "../../Textures/TextureMagnificationFilter.js";
import TextureWrap from "../../Textures/TextureWrap.js";
import SamplerNameGL2 from "../Names/SamplerNameGL2.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";

class TextureSamplerGL2 extends TextureSampler{
  /**
   * 构造方法
   * @param {WebGL2RenderingContext} gl
   * @param {TextureMinificationFilter} minificationFilter 
   * @param {TextureMagnificationFilter} magnificationFilter 
   * @param {TextureWrap} wrapS 
   * @param {TextureWrap} wrapT 
   * @param {Number} maximumAnistropy 
   */
  constructor(gl, minificationFilter, magnificationFilter, 
    wrapS, wrapT, maximumAnistropy) 
  {
    super();
    this._gl = gl;

    this._name = new SamplerNameGL2(this._gl);
    this._minificationFilter = minificationFilter;
    this._magnificationFilter = magnificationFilter;
    this._wrapS = wrapS;
    this._wrapT = wrapT;

    this._gl.samplerParameteri(this._name.Value, this._gl.TEXTURE_MIN_FILTER, 
      TypeConverterGL2.TextureMinFilterToGL(this._minificationFilter));
    this._gl.samplerParameteri(this._name.Value, this._gl.TEXTURE_MAG_FILTER, 
      TypeConverterGL2.TextureMagFilterToGL(this._magnificationFilter));
    this._gl.samplerParameteri(this._name.Value, this._gl.TEXTURE_WRAP_S, 
      TypeConverterGL2.TextureWrapToGL(this._wrapS));
    this._gl.samplerParameteri(this._name.Value, this._gl.TEXTURE_WRAP_T, 
      TypeConverterGL2.TextureWrapToGL(this._wrapT));  
    // if (Device.Extensions.AnisotropicFiltering)
    //   {
    //       GL.SamplerParameter(_name.Value, (ArbSamplerObjects)All.TextureMaxAnisotropyExt, maximumAnistropy);
    //   }
    //   else
    //   {
    //       if (maximumAnistropy != 1)
    //       {
    //           throw new InsufficientVideoCardException("Anisotropic filtering is not supported.  The extension GL_EXT_texture_filter_anisotropic was not found.");
    //       }
    //   }
  }

  /**
   * 将当前采样器绑定到特定的纹理单元
   * @param {GLuint} textureUnitIndex 
   */
  bind(textureUnitIndex) {
    this._gl.bindSampler(textureUnitIndex, this._name.Value);
  }

  /**
   * 为特定的纹理单元解除绑定的采样器
   * @param {GLuint} textureUnitIndex 
   */
  static UnBind(textureUnitIndex) {
    this._gl.bindSampler(textureUnitIndex, null);
  }

  dispose() {
    
  }
}

export default TextureSamplerGL2;
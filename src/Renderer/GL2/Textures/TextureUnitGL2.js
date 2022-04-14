/**
 * TextureUnitGL2类是TextureUnit抽象类基于WebGL2的实现类
 * TextureUnit类是一个抽象类，用于表示纹理单元
 */

import TextureUnit from "../../Textures/TextureUnit.js";
import Texture2DGL2 from "./Texture2DGL2.js";
import TextureUnitsGL2 from "./TextureUnitsGL2.js";
import TextureSamplerGL2 from "./TextureSamplerGL2.js";
import Device from "../../Device.js";

const None = 0, Texture = 1, TextureSampler = 2;
const DirtyFlags = {    // 用于标识TextureUnitGL2对象的状态
  None: None,
  Texture: Texture,
  TextureSampler: TextureSampler,
  All: Texture | TextureSampler
}

class TextureUnitGL2 extends TextureUnit {
  /**
   * 构造方法
   * @param {WebGL2RenderingContext} gl
   * @param {Number} index 
   * @param {TextureUnitsGL2} observer 
   */
  constructor(gl, index, observer) {
    super();
    this._gl = gl;
    
    this._textureUnitIndex = index;
    this._textureUnit = Device.TEXTURE0 + this._textureUnitIndex;
    this._texture = null;
    this._textureSampler = null;
    this._dirtyFlags = DirtyFlags.None;
    this._observer = observer;
  }

  /**
   * 使用GL调用更新相关状态
   */
  clean() {
    if (this._dirtyFlags !== DirtyFlags.None) {
      this._validate();

      // 激活指定的纹理单元
      this._gl.activeTexture(this._textureUnit);

      if ((this._dirtyFlags & DirtyFlags.Texture) === DirtyFlags.Texture) {
        if (this._texture) {
          this._texture.bind();   // 绑定纹理对象
        } else {
          Texture2DGL2.UnBind();  // 解绑纹理对象
        }
      }

      if ((this._dirtyFlags & DirtyFlags.TextureSampler) === DirtyFlags.TextureSampler) {
        if (this._textureSampler) {
          // 将采样器绑定到指定的纹理单元
          this._textureSampler.bind(this._textureUnitIndex);
        } else {
          // 为指定的纹理单元解绑采样器
          this._textureSampler.UnBind(this._textureUnitIndex);
        }
      }

      this._dirtyFlags = DirtyFlags.None;
    }
  }

  /**
   * 验证状态属性
   */
  _validate() {
    if (this._texture) {
      if (!this._textureSampler) {
        throw new Error("A texture sampler must be assigned to a texture unit with one or more bound textures.");
      }

      // if (_texture.Target == TextureTarget.TextureRectangle)
      // {
      //     if (_textureSampler.MinificationFilter != TextureMinificationFilter.Linear &&
      //         _textureSampler.MinificationFilter != TextureMinificationFilter.Nearest)
      //     {
      //         throw new InvalidOperationException("The texture sampler is incompatible with the rectangle texture bound to the same texture unit.  Rectangle textures only support linear and nearest minification filters.");
      //     }

      //     if (_textureSampler.WrapS == TextureWrap.Repeat ||
      //         _textureSampler.WrapS == TextureWrap.MirroredRepeat ||
      //         _textureSampler.WrapT == TextureWrap.Repeat ||
      //         _textureSampler.WrapT == TextureWrap.MirroredRepeat)
      //     {
      //         throw new InvalidOperationException("The texture sampler is incompatible with the rectangle texture bound to the same texture unit.  Rectangle textures do not support repeat or mirrored repeat wrap modes.");
      //     }
      // }
    }
  }

  /**
  * @returns {Texture2DGL2}
  */
  get Texture() {
    return this._texture;
  }

  /**
   * @param {Texture2DGL2}
   */
  set Texture(texture) {
    if (this._texture !== texture) {
      // 如果当前对象的DirtyFlags状态是None，则通知TextureUnitsGL2
      // 这个观察者将当前对象添加到集合中
      if (this._dirtyFlags === DirtyFlags.None) {
        this._observer.notifyDirty(this);
      }
      this._dirtyFlags |= DirtyFlags.Texture;
      this._texture = texture;
    }
  }

  /**
   * @returns {TextureSamplerGL2}
   */
  get TextureSampler() {
    return this._textureSampler;
  }

  /**
   * @param {TextureSamplerGL2}
   */
  set TextureSampler(sampler) {
    if (this._textureSampler !== sampler) {
      // 如果当前对象的DirtyFlags状态是None，则通知TextureUnitsGL2
      // 这个观察者将当前对象添加到集合中
      if (this._dirtyFlags === DirtyFlags.None) {
        this._observer.notifyDirty(this);
      }
      this._dirtyFlags != DirtyFlags.TextureSampler;
      this._textureSampler = sampler;
    }
  }
}

export default TextureUnitGL2;
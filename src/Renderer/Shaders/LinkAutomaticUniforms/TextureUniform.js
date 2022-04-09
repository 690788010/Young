/**
 * TextureUniform类是LinkAutomaticUniform抽象类的实现类
 * 目前LinkAutomaticUniform抽象类只有TextureUniform类这一个子类
 * TextureUniform类对应2D Sampler
 */

import LinkAutomaticUniform from "./LinkAutomaticUniform.js"
import Uniform from "../Uniform.js";

class TextureUniform extends LinkAutomaticUniform {
  /**
   * 构造函数
   * @param {Number} textureUnit 纹理单元
   */
  constructor(textureUnit) {
    super();

    this._textureUnit = textureUnit;
  }

  /**
   * @returns {String}
   */
  get Name() {
    return "og_texture" + this._textureUnit;
  }
  
  /**
   * 为传入的Uniform设置值
   * @param {Uniform} uniform 
   */
  set(uniform) {
    uniform.Value = this._textureUnit;
  }
}

export default TextureUniform;
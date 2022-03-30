/**
 * TextureUniform类是LinkAutomaticUniform抽象类的实现类
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

  get Name() {
    return "og_texture" + this._textureUnit;
  }

  
  /**
   * 将传入的Uniform的值设置为这个LinkAutomaticUniform的值
   * @param {Uniform} uniform 
   */
  set(uniform) {
    uniform.Value = this._textureUnit;
  }
}

export default TextureUniform;
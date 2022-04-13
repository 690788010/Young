/**
 * TextureUnitGL2类是TextureUnit抽象类基于WebGL2的实现类
 * TextureUnit类是一个抽象类，用于表示纹理单元
 */

import TextureUnit from "../../Textures/TextureUnit.js";

class TextureUnitGL2 extends TextureUnit {
  constructor(index) {
    super();
    
    this._textureUnitIndex = index;
    this._texture = null;
    this._textureSampler = null;
  }

  /**
   * @returns {Texture2D}
   */
   get Texture() {
     return this._texture;
   }

   /**
    * @returns {TextureSampler}
    */
   get TextureSampler() {
     return this._textureSampler;
   }
}

export default TextureUnitGL2;
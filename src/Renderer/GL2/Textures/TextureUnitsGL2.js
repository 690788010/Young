/**
 * TextureUnitsGL2是TextureUnits抽象类基于WebGL2的实现类
 * TextureUnits类是一个抽象类，用于包含多个TextureUnit对象
 */

import TextureUnits from "../../Textures/TextureUnits.js";
import TextureUnitGL2 from "./TextureUnitGL2.js";

class TextureUnitsGL2 extends TextureUnits {
  constructor(gl) {
    super();
    //
    // Device.MAX_COMBINED_TEXTURE_IMAGE_UNITS is not initialized yet.
    //
    const numberOfTextureUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    
    // 初始化
    this._textureUnits = [];
    for (let i = 0; i < numberOfTextureUnits; i++) {
      const textureUnit = new TextureUnitGL2(i);
      this._textureUnits.push(textureUnit);
    }
    this._dirtyTextureUnits = [];
    this._lastTextureUnit = this._textureUnits[numberOfTextureUnits - 1];
  }

  /**
   * 返回纹理单元的个数
   * @returns {Number}
   */
  get Count() {
    return this._textureUnits.length;
  }
}

export default TextureUnitsGL2;
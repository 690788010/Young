/**
 * TextureUnits类是一个抽象类，用于包含多个TextureUnit对象
 */

import TextureUnit from "./TextureUnit.js";

class TextureUnits {

  /**
   * 抽象方法
   * @param {Number} index 
   * @returns {TextureUnit}
   */
  get(index) {}

  /**
   * 抽象方法
   * @returns {Number}
   */
  get Count() {}
}

export default TextureUnits;
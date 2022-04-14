/**
 * TextureUnit类是一个抽象类，用于表示纹理单元
 */
import Texture2D from "./Texture2D.js";
import TextureSampler from "./TextureSampler.js";

class TextureUnit {

  /**
   * 抽象方法
   * @returns {Texture2D}
   */
  get Texture() {}

  /**
   * 抽象方法
   * @param {Texture2D}
   */
  set Texture(texture) {}

  /**
   * 抽象方法
   * @returns {TextureSampler}
   */
  get TextureSampler() {}

  /**
   * 抽象方法
   * @param {TextureSampler}
   */
  set TextureSampler(sampler) {}
}

export default TextureUnit;
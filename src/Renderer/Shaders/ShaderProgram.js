/**
 * ShaderProgram类，抽象类
 */

import UniformCollection from "./UniformCollection.js";

class ShaderProgram {
  constructor() {
    
  }

  /**
   * 返回UniformCollection
   * @returns {UniformCollection}
   */
  get Uniforms() {
    return this._uniforms;
  }
}

export default ShaderProgram;
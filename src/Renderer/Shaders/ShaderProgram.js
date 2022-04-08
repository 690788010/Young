/**
 * ShaderProgram类，抽象类
 */

import UniformCollection from "./UniformCollection.js";

class ShaderProgram {

  /**
   * 返回着色器中所有的attribute属性的元数据
   * @returns {ShaderVertexAttributeCollection}
   */
   get VertexAttributes() {
    return this._vertexAttributes;
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
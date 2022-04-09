/**
 * ShaderProgram类，抽象类
 */

import UniformCollection from "./UniformCollection.js";
import ShaderVertexAttributeCollection from "../ShaderVertexAttributeCollection.js";
import FragmentOutputs from "./FragmentOutputs.js"

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

  /**
   * 返回FragmentOutputs对象
   * @returns {FragmentOutputs}
   */
  get FragmentOutputs() {
    return this._fragmentOutputs;
  }

  /**
   * 初始化AutomaticUniform
   * @param {UniformCollection} uniforms 
   */
  _initializeAutomaticUniforms(uniforms) {
    for (let i = 0, len = uniforms.size(); i < len; i++) {
      const uniform = uniforms.get(i);
      if (Device.LinkAutomaticUniforms.contains(uniform.Name)) {
        // 初始化LinkAutomaticUniform
        Device.LinkAutomaticUniforms.getByName(uniform.Name).set(uniform);
      } else if (Device.DrawAutomaticUniformFactories.contains(uniform.Name)) {
        // 初始化DrawAutomaticUniform
        this._drawAutomaticUniforms.push(
          Device.DrawAutomaticUniformFactories.getByName(uniform.Name).create(uniform));
      }
    }
  }
}

export default ShaderProgram;
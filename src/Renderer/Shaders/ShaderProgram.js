/**
 * ShaderProgram类，抽象类
 */

import UniformCollection from "./UniformCollection.js";
import ShaderVertexAttributeCollection from "./ShaderVertexAttributeCollection.js";
import FragmentOutputs from "./FragmentOutputs.js"
import Device from "../Device.js";
import Disposable from "../../Core/Disposable.js";

class ShaderProgram extends Disposable{
  constructor() {
    super();

    this._drawAutomaticUniforms = [];
  }

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
   * 抽象方法
   */
  dispose() {}

  /**
   * 初始化AutomaticUniform
   * @param {UniformCollection} uniforms 
   */
  _initializeAutomaticUniforms(uniforms) {
    for (let i = 0, len = uniforms.size(); i < len; i++) {
      const uniform = uniforms.get(i);
      if (Device.LinkAutomaticUniforms.contains(uniform.Name)) {
        // 使用Device类的LinkAutoMaticUniform集合中对应的LinkAutoMaticUniform的值为对应的Uniform设置值
        Device.LinkAutomaticUniforms.getByName(uniform.Name).set(uniform);
      } else if (Device.DrawAutomaticUniformFactories.contains(uniform.Name)) {
        // 初始化DrawAutomaticUniform
        this._drawAutomaticUniforms.push(
          Device.DrawAutomaticUniformFactories.getByName(uniform.Name).create(uniform));
      }
    }
  }

  /**
   * 更新各个DrawAutomaticUniform的值
   * @param {*} context 
   * @param {*} drawState 
   * @param {*} sceneState 
   */
  _setDrawAutomaticUniforms(context, drawState, sceneState) {
    for (let i = 0, len = this._drawAutomaticUniforms.length; i < len; i++) {
      this._drawAutomaticUniforms[i].set(context, drawState, sceneState);
    }
  }
}

export default ShaderProgram;
/**
 * LightPropertiesUniform类表示光照参数的DrawAutomaticUniform
 * 每次draw调用前会调用set方法更新对应的Uniform的值
 */

import Vector4D from "../../../Core/Vectors/Vector4D.js";
import DrawAutomaticUniform from "./DrawAutomaticUniform.js";
import SceneState from "../../Scene/SceneState.js";

class LightPropertiesUniform extends DrawAutomaticUniform {
  /**
    * 构造函数
    * @param {Uniform} uniform 
    */
  constructor(uniform) {
    super();

    this._uniform = uniform;
  }

  /**
   * 实时更新LightPropertiesUniform对应的Uniform的值
   * @param {Context} context
   * @param {DrawState} drawState
   * @param {SceneState} sceneState
   */
  set(context, drawState, sceneState) {
    this._uniform.Value = new Vector4D(
      sceneState.DiffuseIntensity,
      sceneState.SpecularIntensity,
      sceneState.AmbientIntensity,
      sceneState.Shininess);
  }
}

export default LightPropertiesUniform;
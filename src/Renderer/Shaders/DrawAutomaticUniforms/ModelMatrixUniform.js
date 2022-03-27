/**
 * ModelMatrixUniform类表示模型矩阵的Uniform
 */

import Uniform from "../Uniform.js";
import DrawAutomaticUniform from "./DrawAutomaticUniform.js";

class ModelMatrixUniform extends DrawAutomaticUniform {
  /**
   * 构造函数
   * @param {Uniform} uniform 
   */
  constructor(uniform) {
    this._uniform = uniform;
  }

  /**
   * 更新ModelMatrixUniform
   * @param {Context} context
   * @param {DrawState} drawState
   * @param {SceneState} sceneState
   */
  set(context, drawState, sceneState) {
    this._uniform.Value = sceneState.ModelMatrixUniform;
  }
}

export default ModelMatrixUniform;
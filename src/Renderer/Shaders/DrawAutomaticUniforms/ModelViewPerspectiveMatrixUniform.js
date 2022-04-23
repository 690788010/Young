/**
* ModelViewPerspectiveMatrixUniform类表示MVP矩阵的DrawAutomaticUniform
* 每次draw调用前会调用set方法更新对应的Uniform的值
*/

import Uniform from "../Uniform.js";
import DrawAutomaticUniform from "./DrawAutomaticUniform.js";

class ModelViewPerspectiveMatrixUniform extends DrawAutomaticUniform {
  /**
   * 构造函数
   * @param {Uniform}
   */
   constructor(uniform) {
    super();

    this._uniform = uniform;
  }

  /**
   * 实时更新ModelViewPerspectiveMatrixUniform对应的Uniform的值
   * @param {Context} context
   * @param {DrawState} drawState
   * @param {SceneState} sceneState
   */
  set(context, drawState, sceneState) {
    this._uniform.Value = sceneState.ModelViewPerspectiveMatrix;
  }
}

export default ModelViewPerspectiveMatrixUniform;
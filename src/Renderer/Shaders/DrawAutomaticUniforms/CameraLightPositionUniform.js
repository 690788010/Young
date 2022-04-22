/**
 * CameraLightPositionUniform类表示相机灯光位置（世界坐标）的DrawAutomaticUniform
 * 每次draw调用前会调用set方法更新对应的Uniform的值
 */

import Uniform from "../Uniform.js";
import DrawAutomaticUniform from "./DrawAutomaticUniform.js";
import SceneState from "../../Scene/SceneState.js";
 
class CameraLightPositionUniform extends DrawAutomaticUniform {
  /**
   * 构造函数
   * @param {Uniform} uniform 
   */
  constructor(uniform) {
    super();

    this._uniform = uniform;
  }
 
  /**
   * 实时更新CameraLightPositionUniform对应的Uniform的值
   * @param {Context} context
   * @param {DrawState} drawState
   * @param {SceneState} sceneState
   */
  set(context, drawState, sceneState) {
    this._uniform.Value = sceneState.CameraLightPosition;
  }
}
 
export default CameraLightPositionUniform;
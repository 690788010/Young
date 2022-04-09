/**
 * DrawAutomaticUniform类是一个抽象类，与LinkAutomaticUnform不同，DrawAutomaticUniform经常改变
 * 每次draw调用前会调用set方法更新对应的Uniform的值
 */
import Context from "../../Context.js";
import DrawState from "../../DrawState.js";
import SceneState from "../../Scene/SceneState.js";

class DrawAutomaticUniform {
  /**
   * 抽象方法，用于实时更新DrawAutomaticUnifrom对应的Uniform的值
   * @param {Context} context 
   * @param {DrawState} drawState 
   * @param {SceneState} sceneState 
   */
  set(context, drawState, sceneState) {}
}

export default DrawAutomaticUniform;
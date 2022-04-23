/**
 * PerspectiveMatrixUniform类表示透视投影矩阵的DrawAutomaticUniform
 * 每次draw调用前会调用set方法更新对应的Uniform的值
 */

 import Uniform from "../Uniform.js";
 import DrawAutomaticUniform from "./DrawAutomaticUniform.js";
 
 class PerspectiveMatrixUniform extends DrawAutomaticUniform {
   /**
    * 构造函数
    * @param {Uniform}
    */
    constructor(uniform) {
     super();
 
     this._uniform = uniform;
   }
 
   /**
    * 实时更新PerspectiveMatrixUniform对应的Uniform的值
    * @param {Context} context
    * @param {DrawState} drawState
    * @param {SceneState} sceneState
    */
   set(context, drawState, sceneState) {
     this._uniform.Value = sceneState.PerspectiveMatrix;
   }
 }
 
 export default PerspectiveMatrixUniform;
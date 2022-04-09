/**
 * SceneState类用于包含场景级别的状态
 */

import Camera from "./Camera.js";
import Vector3D from "../../Core/Vectors/Vector3D.js"
import Matrix4D from "../../Core/Matrices/Matrix4D.js";

class SceneState {
  constructor() {
    this._diffuseIntensity = 0.65;
    this._specularIntensity = 0.25;
    this._ambientIntensity = 0.10;
    this._shininess = 12;
    this._camera = new Camera();
    this._sunPosition = new Vector3D(200000, 0, 0);
    // 模型矩阵
    this._modelMatrix = Matrix4D.Identity;
    this._highResolutionSnapScale = 1;
  }

  /**
   * @returns {Matrix4D}
   */
  get ModelMatrix() {
    return this._modelMatrix;
  }

}

export default SceneState;
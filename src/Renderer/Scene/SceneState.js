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
   * @returns {Camera}
   */
  get Camera() {
    return this._camera;
  }
  
  /**
   * 相机灯光的位置（世界坐标）
   * @returns {Vector3D}
   */
  get CameraLightPosition() {
    return this._camera.Eye.multiply(5.0);
  }

  /**
   * 模型矩阵
   * @returns {Matrix4D}
   */
  get ModelMatrix() {
    return this._modelMatrix;
  }

  /**
   * @param {Matrix4D} matrix
   */
  set ModelMatrix(matrix) {
    this._modelMatrix = matrix;
  }

  /**
   * 视图矩阵
   * @returns {Matrix4D}
   */
  get ViewMatrix() {
    return Matrix4D.LookAt(this._camera.Eye, this._camera.Target, this._camera.Up);
  }

  /**
   * 模型视图矩阵
   * @returns {Matrix4D}
   */
  get ModelViewMatrix() {
    return this.ViewMatrix.multiply(this.ModelMatrix);
  }

}

export default SceneState;
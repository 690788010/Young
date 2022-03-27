/**
 * SceneState类用于包含场景级别的状态
 */

import Camera from "./Camera";
import Vector3D from "../../Core/Vectors/Vector3D.js"
import Matrix4D from "../../Core/Matrices/Matrix4D";

class SceneState {
  constructor() {
    this.DiffuseIntensity = 0.65;
    this.SpecularIntensity = 0.25;
    this.AmbientIntensity = 0.10;
    this.Shininess = 12;
    this.Camera = new Camera();
    this.SunPosition = new Vector3D(200000, 0, 0);
    this.ModelMatrix = Matrix4D.Identity;
    this.HighResolutionSnapScale = 1;
  }

  get ModelMatrix() {
    return this.ModelMatrix;
  }
}

export default SceneState;
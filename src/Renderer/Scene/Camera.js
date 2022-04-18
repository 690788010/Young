/**
 * Camera类表示相机
 */

import Vector3D from "../../Core/Vectors/Vector3D.js";

class Camera {
  constructor() {
    this._eye = Vector3D.UnitY;
    this._target = Vector3D.Zero;
    this._up = Vector3D.UnitZ;
  }

  /**
   * @returns {Vector3D}
   */
  get Eye() {
    return this._eye;
  }

  /**
   * @param {Vector3D} vector3D
   */
  set Eye(vector3D) {
    this._eye = vector3D;
  }

  /**
   * @returns {Vector3D}
   */
  get Target() {
    return this._target;
  }

  /**
   * @param {Vector3D} vector3D
   */
  set Target(vector3D) {
    this._target = vector3D;
  }

  /**
   * @returns {Vector3D}
   */
  get Up() {
    return this._up;
  }

  /**
   * @param {Vector3D} vector3D
   */
  set Up(vector3D) {
    this._up = vector3D;
  }
}

export default Camera;
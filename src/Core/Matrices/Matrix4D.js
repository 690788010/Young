/**
 * Matrix4D类表示4x4矩阵
 */

import Vector3D from "../Vectors/Vector3D.js";

class Matrix4D {
  /**
   * 构造函数
   * @param {Number} column0row0 
   * @param {Number} column1row0 
   * @param {Number} column2row0 
   * @param {Number} column3row0 
   * @param {Number} column0row1 
   * @param {Number} column1row1 
   * @param {Number} column2row1 
   * @param {Number} column3row1 
   * @param {Number} column0row2 
   * @param {Number} column1row2 
   * @param {Number} column2row2 
   * @param {Number} column3row2 
   * @param {Number} column0row3 
   * @param {Number} column1row3 
   * @param {Number} column2row3 
   * @param {Number} column3row3 
   */
  constructor(
    column0row0, column1row0, column2row0, column3row0,
    column0row1, column1row1, column2row1, column3row1,
    column0row2, column1row2, column2row2, column3row2,
    column0row3, column1row3, column2row3, column3row3
  ) {
    this._values = [
      column0row0, column0row1, column0row2, column0row3,
      column1row0, column1row1, column1row2, column1row3,
      column2row0, column2row1, column2row2, column2row3,
      column3row0, column3row1, column3row2, column3row3
    ];
  }

  /**
   * @returns {Array}
   */
  get Values() {
    return this._values;
  }

  /**
   * 获取矩阵的分量个数
   * @returns {Number}
   */
  get NumberOfComponents() {
    return 16;
  }

  /**
   * 返回一个4x4单位矩阵
   * @returns {Matrix4D}
   */
  static get Identity() {
    return new Matrix4D(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0);
  }

  /**
   * 根据传入参数返回一个视图矩阵
   * @param {Vector3D} eye 
   * @param {Vector3D} target 
   * @param {Vector3D} up 
   */
  static LookAt(eye, target, up) {
    const v = target.subtract(eye).normalize();
    const n = v.cross(up).normalize();
    const u = n.cross(v).normalize();

    const rotation = new Matrix4D(
      n.X,  n.Y,  n.Z, 0.0,
      u.X,  u.Y,  u.Z, 0.0,
     -v.X, -v.Y, -v.Z, 0.0,
      0.0,  0.0,  0.0, 1.0);
    const translation = new Matrix4D(
      1.0, 0.0, 0.0, -eye.X,
      0.0, 1.0, 0.0, -eye.Y,
      0.0, 0.0, 1.0, -eye.Z,
      0.0, 0.0, 0.0, 1.0);
    return rotation.multiply(translation);
  }


  /**
   * 乘以一个Matrix4D矩阵
   * @param {Matrix4D} right 
   * @returns {Matrix4D}
   */
  multiply(right) {
    if (!(right instanceof Matrix4D)) {
      throw new Error("right");
    } 

    const rightValues = right.Values

    const col0row0 = 
      this._values[0] * rightValues[0] + 
      this._values[4] * rightValues[1] + 
      this._values[8] * rightValues[2] + 
      this._values[12] * rightValues[3];
    const col0row1 = 
      this._values[1] * rightValues[0] + 
      this._values[5] * rightValues[1] + 
      this._values[9] * rightValues[2] + 
      this._values[13] * rightValues[3];
    const col0row2 = 
      this._values[2] * rightValues[0] + 
      this._values[6] * rightValues[1] + 
      this._values[10] * rightValues[2] + 
      this._values[14] * rightValues[3];
    const col0row3 = 
      this._values[3] * rightValues[0] + 
      this._values[7] * rightValues[1] + 
      this._values[11] * rightValues[2] + 
      this._values[15] * rightValues[3];

    const col1row0 = 
      this._values[0] * rightValues[4] + 
      this._values[4] * rightValues[5] + 
      this._values[8] * rightValues[6] + 
      this._values[12] * rightValues[7];
    const col1row1 = 
      this._values[1] * rightValues[4] + 
      this._values[5] * rightValues[5] + 
      this._values[9] * rightValues[6] + 
      this._values[13] * rightValues[7];
    const col1row2 = 
      this._values[2] * rightValues[4] + 
      this._values[6] * rightValues[5] + 
      this._values[10] * rightValues[6] + 
      this._values[14] * rightValues[7];
    const col1row3 = 
      this._values[3] * rightValues[4] + 
      this._values[7] * rightValues[5] + 
      this._values[11] * rightValues[6] + 
      this._values[15] * rightValues[7];

    const col2row0 = 
      this._values[0] * rightValues[8] + 
      this._values[4] * rightValues[9] + 
      this._values[8] * rightValues[10] + 
      this._values[12] * rightValues[11];
    const col2row1 = 
      this._values[1] * rightValues[8] + 
      this._values[5] * rightValues[9] + 
      this._values[9] * rightValues[10] + 
      this._values[13] * rightValues[11];
    const col2row2 = 
      this._values[2] * rightValues[8] + 
      this._values[6] * rightValues[9] + 
      this._values[10] * rightValues[10] + 
      this._values[14] * rightValues[11];
    const col2row3 = 
      this._values[3] * rightValues[8] + 
      this._values[7] * rightValues[9] + 
      this._values[11] * rightValues[10] + 
      this._values[15] * rightValues[11];

    const col3row0 = 
      this._values[0] * rightValues[12] + 
      this._values[4] * rightValues[13] + 
      this._values[8] * rightValues[14] + 
      this._values[12] * rightValues[15];
    const col3row1 = 
      this._values[1] * rightValues[12] + 
      this._values[5] * rightValues[13] + 
      this._values[9] * rightValues[14] + 
      this._values[13] * rightValues[15];
    const col3row2 = 
      this._values[2] * rightValues[12] + 
      this._values[6] * rightValues[13] + 
      this._values[10] * rightValues[14] + 
      this._values[14] * rightValues[15];
    const col3row3 = 
      this._values[3] * rightValues[12] + 
      this._values[7] * rightValues[13] + 
      this._values[11] * rightValues[14] + 
      this._values[15] * rightValues[15];

    return new Matrix4D(
      col0row0, col1row0, col2row0, col3row0,
      col0row1, col1row1, col2row1, col3row1,
      col0row2, col1row2, col2row2, col3row2,
      col0row3, col1row3, col2row3, col3row3);
  }

  /**
   * 乘以一个Vector3D向量
   * @param {Vector3D}
   * @returns {Vector3D}
   */
  multVec3(vector3D) {
    return new Vector3D(
      this._values[0] * vector3D.X + this._values[4] * vector3D.Y + this._values[8] * vector3D.Z,
      this._values[1] * vector3D.X + this._values[5] * vector3D.Y + this._values[9] * vector3D.Z,
      this._values[2] * vector3D.X + this._values[6] * vector3D.Y + this._values[10] * vector3D.Z);
  }
}

export default Matrix4D;
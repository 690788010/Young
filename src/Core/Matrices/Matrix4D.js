/**
 * Matrix4D类表示4x4矩阵
 */

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
}

export default Matrix4D;
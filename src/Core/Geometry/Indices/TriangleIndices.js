/**
 * TriangleIndices类
 */

class TriangleIndices {
  /**
   * 构造函数
   * @param {Number} ui0 
   * @param {Number} ui1 
   * @param {Number} ui2 
   */
  constructor(ui0, ui1, ui2) {
    if (ui0 < 0) {
      throw new Error("i0 less than 0");
    }
    if (ui1 < 0) {
      throw new Error("i1 less than 0");
    }
    if (ui2 < 0) {
      throw new Error("i2 less than 0");
    }
    this._ui0 = ui0;
    this._ui1 = ui1;
    this._ui2 = ui2;
  }

  get UI0() {
    return this._ui0;
  }

  get UI1() {
    return this._ui1;
  }

  get UI2() {
    return this._ui2;
  }
} 

export default TriangleIndices;
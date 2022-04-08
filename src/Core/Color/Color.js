/**
 * Color类表示颜色
 */

class Color {
  /**
   * 构造函数
   * @param {Number} r 
   * @param {Number} g 
   * @param {Number} b 
   * @param {Number} a 
   */
  constructor(r, g, b, a = 1.0) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  }

  /**
   * @returns {Number}
   */
  get R() {
    return this._r;
  }

  /**
   * @param {Number} value
   */
  set R(value) {
    this._r = value;
  }

  /**
   * @returns {Number}
   */
  get G() {
    return this._g;
  }

  /**
   * @param {Number} value
   */
  set G(value) {
    this._g = value;
  }

  /**
   * @returns {Number}
   */
  get B() {
    return this._b;
  }

  /**
   * @param {Number} value
   */
  set B(value) {
    this._b = value;
  }

  /**
   * @returns {Color}
   */
  static get White() {
    return new Color(1.0, 1.0, 1.0, 1.0);
  }
}

export default Color;
/**
 * 视口信息
 */

class ViewPort {
  /**
   * 
   * @param {Number} x 视口的左下角水平坐标。默认值：0。
   * @param {Number} y 视口的左下角垂直坐标。默认值：0。
   * @param {Number} width 视口的宽度
   * @param {Number} height 视口的高度
   */
  constructor(x, y, width, height) {
    if (width < 0 || height < 0) {
      throw new Error("The viewport width and height must be greater than or equal to zero.");
    }
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  /**
   * 获取视口的左下角水平坐标
   * @returns {Number}
   */
  get X() {
    return this._x;
  }

  /**
   * 获取视口的左下角垂直坐标
   * @returns {Number}
   */
  get Y() {
    return this._y;
  }

  /**
   * 获取视口的宽度
   * @returns {Number}
   */
  get Width() {
    return this._width;
  }

  /**
   * 获取视口的高度
   * @returns {Number}
   */
  get Height() {
    return this._height;
  }
}

export default ViewPort;
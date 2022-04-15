/**
 * 二维向量类
 */

class Vector2D {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  // 获取x分量
  get X() {
    return this._x;
  }

  // 获取y分量
  get Y() {
    return this._y;
  }
}

export default Vector2D;
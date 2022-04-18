/**
 * 三维向量类
 */

class Vector3D {
  constructor(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  /**
   * @returns {Vector3D}
   */
  static get Zero() {
    return new Vector3D(0.0, 0.0, 0.0);
  }

  /**
   * @returns {Vector3D}
   */
  static get UnitX() {
    return new Vector3D(1.0, 0.0, 0.0);
  }

  /**
   * @returns {Vector3D}
   */
  static get UnitY() {
    return new Vector3D(0.0, 1.0, 0.0);
  }

  /**
   * @returns {Vector3D}
   */
  static get UnitZ() {
    return new Vector3D(0.0, 0.0, 1.0);
  }

  // 获取x分量
  get X() {
    return this._x;
  }

  // 获取y分量
  get Y() {
    return this._y;
  }

  // 获取z分量
  get Z() {
    return this._z;
  }

  // 获取各分量的平方和
  get MagnitudeSquared() {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }

  // 获取向量模
  get Magnitude() {
    return Math.sqrt(this.MagnitudeSquared);
  }

  // 归一化
  normalize() {
    return this.divide(this.Magnitude);
  }

  // 叉积
  cross(other) {
    return new Vector3D(this.Y * other.Z - this.Z * other.Y,
      this.Z * other.X - this.X * other.Z, this.X * other.Y - this.Y * other.X);
  }

  // 点积
  dot(other) {
    return this._x * other._x + this._y * other._y + this._z * other._z;
  }
  
  
  /**
   * 将当前三维向量加上另一个三维向量
   * @param  {Vector3D} addend
   * @returns {Vector3D}
   */
  add(addend) {
    return new Vector3D(this._x + addend._x, this._y + addend._y, this._z + addend._z);
  }

  // 将当前三维向量减去另一个三维向量
  subtract(subtrahend) {
    return new Vector3D(this._x - subtrahend._x, this._y - subtrahend._y, this._z - subtrahend._z);
  }
  
  /**
   * 将当前向量乘以一个标量
   * @param  {Number} scalar
   * @returns {Vector3D}
   */
  multiply(scalar) {
    return new Vector3D(this._x * scalar, this._y * scalar, this._z * scalar);
  }

  // 将当前三维向量乘以另一个三维向量
  multiplyComponents(scale) {
    return new Vector3D(this._x * scale._x, this._y * scale._y, this._z * scale._z);
  }

  // 将当前向量除以一个标量
  divide(scalar) {
    return new Vector3D(this._x / scalar, this._y / scalar, this._z / scalar);
  }
}

export default Vector3D;
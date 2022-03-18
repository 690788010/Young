/**
 * 表示大地坐标
 */

class Geodetic3D {
  constructor(longitude, latitude, height = 0) {
    this._longitude = longitude;
    this._latitude = latitude;
    this._height = height;
  }

  // 基于一个Geodetic3D对象构建一个Geodetic2D对象
  static FromGeodetic2D(geodetic2D, height = 0) {
    return new Geodetic3D(geodetic2D.Longitude, geodetic2D.Latitude, height);
  }

  // 返回经度值
  get Longitude() {
    return this._longitude;
  }

  // 返回纬度值
  get Latitude() {
    return this._latitude;
  }

  // 返回高度值
  get Height() {
    return this._height;
  }

  // 比较当前Geodetic3D对象与另一个Geodetic3D对象是否相等
  equals(other) {
    return this._longitude = other._longitude && this._latitude == other._latitude && this._height == other._height;
  }
}

export default Geodetic3D;
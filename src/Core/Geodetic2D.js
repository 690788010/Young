/**
 * 表示大地坐标（不包含高度值）
 */
class Geodetic2D {
  constructor(longitude, latitude) {
    this._longitude = longitude;
    this._latitude = latitude;
  }

  // 基于一个Geodetic3D对象构建一个Geodetic2D对象
  static FromGeodetic3D(geodetic3D) {
    return new Geodetic2D(geodetic3D.Longitude, geodetic3D.Latitude);
  }

  // 返回经度值
  get Longitude() {
    return this._longitude;
  }

  // 返回纬度值
  get Latitude() {
    return this._latitude;
  }
}

export default Geodetic2D;
/**
 * 椭球体类
 */

import Geodetic3D from "../Geodetic3D.js";
import Geodetic2D from "../Geodetic2D.js";
import Vector3D from "../Vectors/Vector3D.js";

class Ellipsoid {
  static Wgs84 = new Ellipsoid(6378137.0, 6378137.0, 6356752.314245);
  static UnitSphere = new Ellipsoid(1.0, 1.0, 1.0);
  
  /**
   * @constructor
   * @param  {Number} x
   * @param  {Number} y
   * @param  {Number} z
   */
  constructor(x, y, z) {
    if ((x <= 0.0) || (y <= 0.0) || (z <= 0.0)) {
      throw new Error("radii");
    }
    this._radii = new Vector3D(x, y, z);
    this._radiiSquared = new Vector3D(x * x, y * y, z * z);
    this._oneOverRadiiSquared = new Vector3D(1.0 / (x * x), 1.0 / (y * y), 1.0 / (z * z));
  }

  // 基于一个Vector3D对象构建一个新的Ellipsoid对象
  static FromVector(vector3D) {
    return new Ellipsoid(vector3D.X, vector3D.Y, vector3D.Z);
  }

  // 获取半径信息
  get Radii() {
    return this._radii;
  }

  /**
   * 计算某个点的地心表面法向量
   * @static
   * @param  {Vector3D} positionOnEllipsoid 点的空间直角坐标
   * @returns {vector3D}
   */
  static CentricSurfaceNormal(positionOnEllipsoid) {
    return positionOnEllipsoid.normalize();
  }

  /**
   * 计算某个椭球体表面点（空间直角坐标）的大地测量表面法向量
   * @param  {Vector3D} positionOnEllipsoid
   * @returns {vector3D}
   */
  geodeticSurfaceNormal(positionOnEllipsoid) {
    return (positionOnEllipsoid.multiplyComponents(this._oneOverRadiiSquared)).normalize();
  }

  /**
   * 计算某个椭球体表面点（大地坐标）的大地测量表面法向量
   * @param  {Geodetic3D} geodetic
   * @returns {Vector3D}
   */
  geodeticSurfaceNormalByGeodetic3D(geodetic) {
    const cosLatitude = Math.cos(geodetic.Latitude * (Math.PI/180));
    return new Vector3D(cosLatitude * Math.cos(geodetic.Longitude * (Math.PI/180)),
      cosLatitude * Math.sin(geodetic.Longitude * (Math.PI/180)), Math.sin(geodetic.Latitude * (Math.PI/180)));
  }

  /**
   * 将一个点由大地坐标转换为空间直角坐标
   * @param  {Geodetic3D} geodetic
   * @returns {Vector3D}
   */
  toVector3D(geodetic) {
    const n = this.geodeticSurfaceNormalByGeodetic3D(geodetic);
    const k = this._radiiSquared.multiplyComponents(n);
    const gamma = Math.sqrt((k.X * n.X) + (k.Y * n.Y) + (k.Z * n.Z));
    const rSurface = k.divide(gamma);
    return rSurface.add(n.multiply(geodetic.Height));
  }

  /**
   * 将一个位于椭球面的空间直角坐标转换为大地坐标
   * @param  {Vector3D} positionOnEllipsoid
   * @returns {Geodetic2D}
   */
  toGeodetic2D(positionOnEllipsoid) {
    const n = this.geodeticSurfaceNormal(positionOnEllipsoid);
    return new Geodetic2D(Math.atan2(n.Y, n.X),
      Math.asin(n.Z / n.Magnitude));
  }

  /**
   * 将一个任意点沿地心法线投影到椭球体表面，返回该投影点。
   * @param  {Vector3D} positionOnEllipsoid
   * @returns {Geodetic2D}
   */
  scaleToGeocentricSurface(position) {
    const beta = 1.0 / Math.sqrt(
      (position.X * position.X) * _oneOverRadiiSquared.X +
      (position.Y * position.Y) * _oneOverRadiiSquared.Y +
      (position.Z * position.Z) * _oneOverRadiiSquared.Z);
    return position.multiply(beta);
  }
}

export default Ellipsoid;
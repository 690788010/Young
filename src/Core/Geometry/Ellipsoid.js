/**
 * 椭球体类
 */

import Geodetic3D from "../Geodetic3D.js";
import Geodetic2D from "../Geodetic2D.js";
import Vector3D from "../Vectors/Vector3D.js";
import Trig from "../Trig.js";

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
    this._radiiToTheFourth = new Vector3D(
      this._radiiSquared.X * this._radiiSquared.X,
      this._radiiSquared.Y * this._radiiSquared.Y,
      this._radiiSquared.Z * this._radiiSquared.Z);
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
    return new Geodetic2D(Trig.ToDegrees(Math.atan2(n.Y, n.X)),
      Trig.ToDegrees(Math.asin(n.Z / n.Magnitude)));
  }

  /**
   * 将一个任意点从空间直角坐标转换为大地坐标
   * @param  {Vector3D} position
   * @returns {Geodetic3D}
   */
  toGeodetic3D(position) {
    const p = this.scaleToGeodeticSurface(position);
    const h = position.subtract(p);
    const height = Math.sign(h.dot(position)) * h.Magnitude;
    const geodetic2d = this.toGeodetic2D(p)
    return new Geodetic3D(geodetic2d.Longitude, geodetic2d.Latitude, height);
  }

  /**
   * 将一个任意点（空间直角坐标）沿大地表面法线投影到椭球体表面，返回该投影点。
   * @param  {Vector3D} position
   * @returns {Geodetic3D}
   */
  scaleToGeodeticSurface(position) {
    const beta = 1.0 / Math.sqrt(
      (position.X * position.X) * this._oneOverRadiiSquared.X +
      (position.Y * position.Y) * this._oneOverRadiiSquared.Y +
      (position.Z * position.Z) * this._oneOverRadiiSquared.Z);
    const n = new Vector3D(
        beta * position.X * this._oneOverRadiiSquared.X,
        beta * position.Y * this._oneOverRadiiSquared.Y,
        beta * position.Z * this._oneOverRadiiSquared.Z).Magnitude;
    let alpha = (1.0 - beta) * (position.Magnitude / n);

    const x2 = position.X * position.X;
    const y2 = position.Y * position.Y;
    const z2 = position.Z * position.Z;

    let da = 0.0;
    let db = 0.0;
    let dc = 0.0;

    let s = 0.0;
    let dSdA = 1.0;

    do {
      alpha -= (s / dSdA);

      da = 1.0 + (alpha * this._oneOverRadiiSquared.X);
      db = 1.0 + (alpha * this._oneOverRadiiSquared.Y);
      dc = 1.0 + (alpha * this._oneOverRadiiSquared.Z);

      const da2 = da * da;
      const db2 = db * db;
      const dc2 = dc * dc;

      const da3 = da * da2;
      const db3 = db * db2;
      const dc3 = dc * dc2;

      s = x2 / (this._radiiSquared.X * da2) +
        y2 / (this._radiiSquared.Y * db2) +
        z2 / (this._radiiSquared.Z * dc2) - 1.0;

      dSdA = -2.0 *
        (x2 / (this._radiiToTheFourth.X * da3) +
        y2 / (this._radiiToTheFourth.Y * db3) +
        z2 / (this._radiiToTheFourth.Z * dc3));
    } while (Math.abs(s) > 1e-10);

    return new Vector3D(
      position.X / da,
      position.Y / db,
      position.Z / dc);
  }

  /**
   * 将一个任意点沿地心表面法线投影到椭球体表面，返回该投影点。
   * @param  {Vector3D} position
   * @returns {Vector3D}
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
/**
 * Trig类提供了十进制度和弧度转换的方法
 */

import Geodetic2D from "./Geodetic2D.js";
import Geodetic3D from "./Geodetic3D.js";

const RadiansPerDegree = Math.PI / 180.0;

class Trig {
  static OneOverPi = 1.0 / Math.PI;
  static OneOverTwoPi = 1.0 / (2.0 * Math.PI);

  // 将十进制度转换为弧度
  static ToRadians(degrees) {
    return degrees * RadiansPerDegree;
  }

  // 将Geodetic3D对象中的经纬度由十进制度转换为弧度
  static Geodetic3DToRadians(geodetic) {
    return new Geodetic3D(this.ToRadians(geodetic.Longitude), this.ToRadians(geodetic.Latitude), geodetic.Height);
  }

  // 将Geodetic2D对象中的经纬度由十进制度转换为弧度
  static Geodetic2DToRadians(geodetic) {
    return new Geodetic2D(this.ToRadians(geodetic.Longitude), this.ToRadians(geodetic.Latitude));
  }

  // 将弧度转换为十进制度
  static ToDegrees(radians) {
    return radians / RadiansPerDegree;
  }

  // 将Geodetic3D对象中的经纬度由弧度转换为十进制度
  static Geodetic3DToDegrees(geodetic) {
    return new Geodetic3D(this.ToRadians(geodetic.Longitude), this.ToRadians(geodetic.Latitude), geodetic.Height);
  }

  // 将Geodetic2D对象中的经纬度由弧度转换为十进制度
  static Geodetic2DToDegrees(geodetic) {
    return new Geodetic2D(this.ToRadians(geodetic.Longitude), this.ToRadians(geodetic.Latitude));
  }
}

export default Trig;
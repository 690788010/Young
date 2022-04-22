/**
 * GridResolution类表示经纬度格网分辨率
 */

import Interval from "../../../Core/Interval.js";
import Vector2D from "../../../Core/Vectors/Vector2D.js";


class GridResolution {
  /**
   * 
   * @param {Interval} interval 
   * @param {Vector2D} resolution 
   */
  constructor(interval, resolution) {
    this._interval = interval;
    this._resolution = resolution;
  }

  /**
   * @returns {Interval}
   */
  get Interval() {
    return this._interval;
  }

  /**
   * @returns {Vector2D}
   */
  get Resolution() {
    return this._resolution;
  }
}

export default GridResolution;
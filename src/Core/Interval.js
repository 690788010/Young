/**
 * Interval类表示区间
 */

import IntervalEndpoint from "./IntervalEndpoint.js";

class Interval {
  constructor(minimum, maximum, minimumEndpoint = IntervalEndpoint.Closed, maximumEndpoint = IntervalEndpoint.Open) {
    if (maximum < minimum) {
      throw new Error("maximum < minimum");
    }

    this._minimum = minimum;
    this._maximum = maximum;
    this._minimumEndpoint = minimumEndpoint;
    this._maximumEndpoint = maximumEndpoint;
  }

  /**
   * 判断values是否在本区间范围内
   * @param {Object} value 
   * @returns {Boolean}
   */
  contains(value) {
    const satisfiesMinimum = (this._minimumEndpoint === IntervalEndpoint.Closed) ? (value >= this._minimum) : (value > this._minimum);
    const satisfiesMaximum = (this._maximumEndpoint === IntervalEndpoint.Closed) ? (value <= this._maximum) : (value < this._maximum);
    
    return satisfiesMinimum && satisfiesMaximum;
  }
}

export default Interval;
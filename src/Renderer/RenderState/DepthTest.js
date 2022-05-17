/**
 * DepthTest类包含深度测试相关的状态信息
 */

import DepthTestFunction from "./DepthTestFunction.js";

class DepthTest {
  constructor() {
    this._enabled = true;   // 是否开启深度测试
    this._function = DepthTestFunction.LESS;    // 深度测试函数
  }

  /**
   * @returns {Boolean}
   */
  get Enabled() {
    return this._enabled;
  }

  /**
   * @param {Boolean} value
   */
  set Enabled(value) {
    this._enabled = value;
  }

  /**
   * @returns {DepthTestFunction}
   */
  get Function() {
    return this._function;
  }

  /**
   * @param {DepthTestFunction} value
   */
  set Function(value) {
    this._function = value;
  }
}

export default DepthTest;
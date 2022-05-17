/**
 * FaceCulling类包含面剔除相关的状态信息
 */

import WindingOrder from "../../Core/Geometry/WindingOrder.js";
import CullFace from "./CullFace.js";

class FaceCulling {
  constructor() {
    this._enabled = true;   // 是否启用面剔除
    this._cullFace = CullFace.BACK;   // 指定剔除的面是正面还是背面
    this._frontFace = WindingOrder.CCW;   // 指定正面的绕转方向（顺时针或逆时针）
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
   * @returns {CullFace}
   */
  get CullFace() {
    return this._cullFace;
  }

  /**
   * @param {CullFace}
   */
  set CullFace(value) {
    this._cullFace = value;
  }

  /**
   * @returns {WindingOrder}
   */
  get FrontFace() {
    return this._frontFace;
  }

  /**
   * @param {WindingOrder}
   */
  set FrontFace(value) {
    this._frontFace = value;
  }
}

export default FaceCulling;
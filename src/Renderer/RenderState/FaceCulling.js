/**
 * FaceCulling类包含面剔除方面的状态信息
 */

import WindingOrder from "../../Core/Geometry/WindingOrder.js";
import CullFace from "./CullFace.js";

class FaceCulling {
  constructor() {
    this._enabled = true;
    this._cullFace = CullFace.BACK;
    this._frontFace = WindingOrder.CCW;
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
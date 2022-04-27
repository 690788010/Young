/**
 * ClearState类用于包含清除帧缓存所需的相关状态信息
 */

import Color from "../../Core/Color/Color.js";
import ClearBuffers from "./ClearBuffers.js";

class ClearState {
  constructor() {
    // ScissorTest = new ScissorTest();
    // ColorMask = new ColorMask(true, true, true, true);
    this._depthMask = true;
    // FrontStencilMask = ~0;
    // BackStencilMask = ~0;

    // 表示清除哪个缓冲的位掩码
    this._buffers = ClearBuffers.All;
    // 颜色缓冲的颜色
    this._color = new Color(0.0, 0.5, 0.5, 1.0);
    // 深度缓冲的值
    this._depth = 1.0;
    // 模板缓冲的值
    this._stencil = 0;
  }

  /**
   * @returns {Boolean}
   */
  get DepthMask() {
    return this._depthMask;
  }

  /**
   * @param {Boolean} value
   */
  set DepthMask(value) {
    this._depthMask = value;
  }

  /**
   * @returns {ClearBuffers}
   */
  get Buffers() {
    return this._buffers;
  }

  /**
   * @param {ClearBuffers}
   */
  set Buffers(value) {
    this._buffers = value;
  }

  /**
   * @returns {Color}
   */
  get Color() {
    return this._color;
  }

  /**
   * @param {Color} value
   */
  set Color(value) {
    this._color = value;
  }

  /**
   * @returns {Number}
   */
  get Depth() {
    return this._depth;
  }

  /**
   * @param {Number} value
   */
  set Depth(value) {
    this._depth = value;
  }

  /**
   * @returns {Number}
   */
  get Stencil() {
    return this._stencil;
  }

  /**
   * @param {Number} value
   */
  set Stencil(value) {
    this._stencil = value;
  }
}

export default ClearState;
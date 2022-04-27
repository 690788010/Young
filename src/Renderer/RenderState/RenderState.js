/**
 * RenderState类用于保存所有的渲染状态信息
 */

import DepthTest from "./DepthTest.js";
import FaceCulling from "./FaceCulling.js";

class RenderState {
  /**
   * 构造函数
   */
  constructor() {
    this._depthTest = new DepthTest();
    this._depthMask = true;
    this._faceCulling = new FaceCulling();
  }
  // PrimitiveRestart = new PrimitiveRestart();
  // ProgramPointSize = ProgramPointSize.Disabled;
  // RasterizationMode = RasterizationMode.Fill;
  // ScissorTest = new ScissorTest();
  // StencilTest = new StencilTest();
  // DepthRange = new DepthRange();
  // Blending = new Blending();
  // ColorMask = new ColorMask(true, true, true, true);

  /**
   * @returns {DepthTest}
   */
  get DepthTest() {
    return this._depthTest;
  }

  /**
   * @param {DepthTest} value
   */
  set DepthTest(value) {
    this._depthTest = value;
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
   * @returns {FaceCulling}
   */
  get FaceCulling() {
    return this._faceCulling;
  }

  /**
   * @param {FaceCulling}
   */
  set FaceCulling(value) {
    this._faceCulling = value;
  }
}

export default RenderState;
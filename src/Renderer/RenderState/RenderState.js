/**
 * RenderState类用于保存所有的渲染状态信息
 */

import DepthTest from "./DepthTest.js";
import FaceCulling from "./FaceCulling.js";
import Blending from "./Blending.js";

class RenderState {
  /**
   * 构造函数
   */
  constructor() {
    // 深度测试相关状态信息
    this._depthTest = new DepthTest();

    // 是否启用深度写入的状态信息
    this._depthMask = true;

    // 面剔除相关状态信息
    this._faceCulling = new FaceCulling();

    // 混合相关状态信息
    this._blending = new Blending();
  }
  // PrimitiveRestart = new PrimitiveRestart();
  // ProgramPointSize = ProgramPointSize.Disabled;
  // RasterizationMode = RasterizationMode.Fill;
  // ScissorTest = new ScissorTest();
  // StencilTest = new StencilTest();
  // DepthRange = new DepthRange();
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
   * @param {FaceCulling} value
   */
  set FaceCulling(value) {
    this._faceCulling = value;
  }

  /**
   * @returns {Blending}
   */
  get Blending() {
    return this._blending;
  }

  /**
   * @param {Blending} value
   */
  set Blending(value) {
    this._blending = value;
  }
}

export default RenderState;
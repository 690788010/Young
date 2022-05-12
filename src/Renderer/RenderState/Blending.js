import Color from "../../Core/Color/Color.js";
import BlendingEquation from "./BlendingEquation.js";
import BlendingFactor from "./BlendingFactor.js";

class Blending {
  constructor() {
    this._enabled = false;
    this._sourceRGBFactor = BlendingFactor.ONE;
    this._sourceAlphaFactor = BlendingFactor.ONE;
    this._destinationRGBFactor = BlendingFactor.ZERO;
    this._destinationAlphaFactor = BlendingFactor.ZERO;
    this._rgbEquation = BlendingEquation.FUNC_ADD;
    this._alphaEquation = BlendingEquation.FUNC_ADD;
    this._blendColor = new Color(0, 0, 0, 0);
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
   * @returns {BlendingFactor}
   */
  get SourceRGBFactor() {
    return this._sourceRGBFactor;
  }

  /**
   * @param {BlendingFactor} value
   */
  set SourceRGBFactor(value) {
    this._sourceRGBFactor = value;
  }

  /**
   * @returns {BlendingFactor}
   */
  get SourceAlphaFactor() {
    return this._sourceAlphaFactor;
  }

  /**
   * @param {BlendingFactor} value
   */
  set SourceAlphaFactor(value) {
    this._sourceAlphaFactor = value;
  }

  /**
   * @returns {BlendingFactor}
   */
  get DestinationRGBFactor() {
    return this._destinationRGBFactor;
  }

  /**
   * @param {BlendingFactor} value
   */
  set DestinationRGBFactor(value) {
    this._destinationRGBFactor = value;
  }

  /**
   * @returns {BlendingFactor}
   */
  get DestinationAlphaFactor() {
    return this._destinationAlphaFactor;
  }

  /**
   * @param {BlendingFactor} value
   */
  set DestinationAlphaFactor(value) {
    this._destinationAlphaFactor = value;
  }

  /**
   * @returns {BlendingEquation}
   */
  get RgbEquation() {
    return this._rgbEquation;
  }

  /**
   * @param {BlendingEquation} value
   */
  set RgbEquation(value) {
    this._rgbEquation = value;
  } 

  /**
   * @returns {BlendingEquation}
   */
  get AlphaEquation() {
    return this._alphaEquation;
  }

  /**
   * @param {BlendingEquation} value
   */
  set AlphaEquation(value) {
    this._alphaEquation = value;
  }

  /**
   * @returns {Color}
   */
  get BlendColor() {
    return this._blendColor;
  }

  /**
   * @param {Color} value
   */
  set BlendColor(value) {
    this._blendColor = value;
  }
} 

export default Blending;
import GraphicsWindow from "../../../Renderer/GraphicsWindow.js";
import RenderState from "../../../Renderer/RenderState/RenderState.js";
import Verify from "../../Infrastructure/Verify.js";
import Shader from "../../Infrastructure/Shader.js";
import Vector3D from "../../../Core/Vectors/Vector3D.js";
import BufferHint from "../../../Renderer/Buffers/BufferHint.js";
import VertexLocations from "../../../Renderer/VertexArray/VertexLocations.js";
import VertexBufferAttributeGL2 from "../../../Renderer/GL2/VertexArray/VertexBufferAttributeGL2.js";
import ComponentDatatype from "../../../Renderer/VertexArray/ComponentDatatype.js";
import DrawState from "../../../Renderer/DrawState.js";
import PrimitiveType from "../../../Core/Geometry/PrimitiveType.js";
import Ellipsoid from "../../../Core/Geometry/Ellipsoid.js";
import BlendingFactor from "../../../Renderer/RenderState/BlendingFactor.js";


class Plane {
  /**
   * 
   * @param {GraphicsWindow} window 
   */
  constructor(window) {
    Verify.ThrowIfNull(window, "window is null.");

    this._window = window;

    const fillRS = new RenderState();
    fillRS.FaceCulling.Enabled = false;
    fillRS.Blending.Enabled = true;
    fillRS.Blending.SourceRGBFactor = BlendingFactor.SRC_ALPHA;
    fillRS.Blending.SourceAlphaFactor = BlendingFactor.SRC_ALPHA;
    fillRS.Blending.DestinationRGBFactor = BlendingFactor.ONE_MINUS_SRC_ALPHA;
    fillRS.Blending.DestinationAlphaFactor = BlendingFactor.ONE_MINUS_SRC_ALPHA;

    const fillSP = this._window.createShaderProgram(
      Shader.loadShaderFile("Young/src/Scene/Renderables/Plane/Shaders/fillVS.glsl"), 
      Shader.loadShaderFile("Young/src/Scene/Renderables/Plane/Shaders/fillFS.glsl"));
    
    this._fillLogarithmicDepth = fillSP.Uniforms.getByName("u_logarithmicDepth");
    this._fillLogarithmicDepth.Value = false;
    this._fillLogarithmicDepthConstant = fillSP.Uniforms.getByName("u_logarithmicDepthConstant");
    this._fillColor = fillSP.Uniforms.getByName("u_color");
    this._fillAlpha = fillSP.Uniforms.getByName("u_alpha");

    this._positionBuffer = this._window.createVertexBuffer(BufferHint.StaticDraw, Float32Array.BYTES_PER_ELEMENT * 4 * 3);
    const indexBuffer = this._window.createIndexBuffer(BufferHint.StaticDraw, Uint16Array.BYTES_PER_ELEMENT * 6);
    const indices = new Uint16Array([
      0, 1, 2,
      0, 2, 3
    ]);
    indexBuffer.copyFromSystemMemory(indices);
    this._va = this._window.Context.createVertexArray();
    this._va.Attributes.set(VertexLocations.Position, new VertexBufferAttributeGL2(this._positionBuffer,
      ComponentDatatype.Float, 3, false, 0, 0));
    this._va.IndexBuffer = indexBuffer;


    this._drawStateFill = new DrawState(fillRS, fillSP, this._va);

    this._origin = Vector3D.Zero;
    this._xAxis = Vector3D.UnitX;
    this._yAxis = Vector3D.UnitZ;

    this._show = true;
    this._showFill = true;

    this._dirty = true;
  }

  _update() {
    if (this._dirty) {
      const leftBottom = this._origin.subtract(this._xAxis).subtract(this._yAxis);
      const rightBottom = this._origin.add(this._xAxis).subtract(this._yAxis);
      const rightTop = this._origin.add(this._xAxis).add(this._yAxis);
      const leftTop = this._origin.subtract(this._xAxis).add(this._yAxis);
      const positions = [
        leftBottom.X, leftBottom.Y, leftBottom.Z,
        rightBottom.X, rightBottom.Y, rightBottom.Z,
        rightTop.X, rightTop.Y, rightTop.Z,
        leftTop.X, leftTop.Y, leftTop.Z,
      ];
      this._positionBuffer.copyFromSystemMemory(new Float32Array(positions));
      this._dirty = false;
    }
  }

  render(sceneState) {
    if (this._show) {
      this._update();

      if (this._showFill) {
        this._window.Context.draw(PrimitiveType.Triangles, this._drawStateFill, sceneState);
      }
    }
  }

  /**
   * @returns {Vector3D}
   */
  get Origin() {
    return this._origin;
  }

  /**
   * @param {Vector3D} value
   */
  set Origin(value) {
    this._dirty = true;
    this._origin = value;
  }

  /**
   * @returns {Vector3D}
   */
  get XAxis() {
    return this._xAxis;
  }

  /**
   * @param {Vector3D}
   */
  set XAxis(value) {
    this._dirty = true;
    this._xAxis = value;
  }

  /**
   * @returns {Vector3D}
   */
   get YAxis() {
    return this._yAxis;
  }

  /**
   * @param {Vector3D}
   */
  set YAxis(value) {
    this._dirty = true;
    this._yAxis = value;
  }

  /**
   * @returns {Boolean}
   */
  get LogarithmicDepth() {
    return this._fillLogarithmicDepth;
  }

  /**
   * @param {Boolean} value
   */
  set LogarithmicDepth(value) {
    this._fillLogarithmicDepth.Value = value;
  }

  /**
   * @returns {Number} 
   */
  get LogarithmicDepthConstant() {
    return this._fillLogarithmicDepthConstant;
  }

  /**
   * @param {Number} value
   */
  set LogarithmicDepthConstant(value) {
    this._fillLogarithmicDepthConstant.Value = value;
  }

  /**
   * @returns {Vector3D}
   */
  get FillColor() {
    return this._fillColor;
  }

  /**
   * @param {Vector3D} value
   */
  set FillColor(value) {
    this._fillColor.Value = value;
  }

  /**
   * @returns {Number}
   */
  get FillAlpha() {
    return this._fillAlpha;
  }

  /**
   * @param {Number} value
   */
  set FillAlpha(value) {
    this._fillAlpha.Value = value;
  }

  /**
   * @returns {Boolean}
   */
  get Show() {
    return this._show;
  }

  /**
   * @param {Boolean} value
   */
  set Show(value) {
    this._show = value;;
  }

  /**
   * @returns {Boolean}
   */
  get ShowFill() {
    return this._showFill;
  }

  /**
   * @param {Boolean}
   */
  set ShowFill(value) {
    this._showFill = value;
  }
}

export default Plane;
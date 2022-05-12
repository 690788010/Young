import Ellipsoid from "../../../Core/Geometry/Ellipsoid.js";
import GeographicGridEllipsoidTessellator from "../../../Core/Tessellation/GeographicGridEllipsoidTessellator.js";
import VertexAttributeComponents from "../../../Core/Tessellation/VertexAttributeComponents.js";
import DrawState from "../../../Renderer/DrawState.js";
import GraphicsWindow from "../../../Renderer/GraphicsWindow.js";
import Texture2D from "../../../Renderer/Textures/Texture2D.js";
import Vector3D from "../../../Core/Vectors/Vector3D.js";
import Shader from "../../Infrastructure/Shader.js";
import TextureMagnificationFilter from "../../../Renderer/Textures/TextureMagnificationFilter.js";
import TextureMinificationFilter from "../../../Renderer/Textures/TextureMinificationFilter.js";
import TextureWrap from "../../../Renderer/Textures/TextureWrap.js";
import BufferHint from "../../../Renderer/Buffers/BufferHint.js";
import RenderState from "../../../Renderer/RenderState/RenderState.js";
import DepthTestFunction from "../../../Renderer/RenderState/DepthTestFunction.js";

class TessellatedGlobe {
  /**
   * 
   * @param {GraphicsWindow} window 
   */
  constructor(window) {
    this._window = window;

    this._shape = Ellipsoid.ScaledWgs84;

    const sp = this._window.createShaderProgram(
      Shader.loadShaderFile("Young/src/Scene/Globes/Tessellated/Shaders/globeVS.glsl"), 
      Shader.loadShaderFile("Young/src/Scene/Globes/Tessellated/Shaders/globeFS.glsl"));
    
    this._textured = sp.Uniforms.getByName("u_Textured");
    this._textured.Value = true;
    this._logarithmicDepth = sp.Uniforms.getByName("u_logarithmicDepth");
    this._logarithmicDepth.Value = false;
    this._logarithmicDepthConstant = sp.Uniforms.getByName("u_logarithmicDepthConstant");

    this._drawState = new DrawState();
    this._drawState.ShaderProgram = sp;
    this._drawState.RenderState = new RenderState();

    this._numberOfSlicePartitions = 32;
    this._numberOfStackPartitions = 16;

    const sampler = this._window.createTexture2DSampler(
      TextureMinificationFilter.LINEAR,
      TextureMagnificationFilter.LINEAR,
      TextureWrap.REPEAT,
      TextureWrap.REPEAT);
    this._window.Context.TextureUnits.get(0).TextureSampler = sampler;

    this._dirty = true;
  }

  _clean() {
    if (this._dirty) {
      if (this._drawState.VertexArray != null) {
        this._drawState.VertexArray.dispose();
        this._drawState.VertexArray = null;
      }

      const mesh = GeographicGridEllipsoidTessellator.Compute(this._shape, 
        this._numberOfSlicePartitions, this._numberOfStackPartitions, VertexAttributeComponents.Position);
      this._drawState.VertexArray = this._window.Context.createVertexArrayByMesh(mesh, this._drawState.ShaderProgram.VertexAttributes, BufferHint.StaticDraw);
      this._primitiveType = mesh.PrimititveType;
      
      this._drawState.RenderState.FaceCulling.FrontFace = mesh.WindingOrder;

      if (this._textured.Value && this._texture) {
        this._window.Context.TextureUnits.get(0).Texture = this._texture;
      }
    
      this._dirty = false;
    }
  }

  render(sceneState) {
    this._clean();

    this._window.Context.draw(this._primitiveType, this._drawState, sceneState);
  }

  /**
   * @returns {Texture2D}
   */
  get Texture() {
    return this._texture;
  }
  /**
   * @param {Texture2D} value
   */
  set Texture(value) {
    this._dirty = true;
    this._texture = value;
  }

  /**
   * @returns {DepthTestFunction}
   */
  get DepthTestFunction() {
    return this._drawState.RenderState.DepthTest.Function;
  }

  /**
   * @param {DepthTestFunction} value
   */
  set DepthTestFunction(value) {
    this._drawState.RenderState.DepthTest.Function = value;
  }

  /**
   * @returns {Boolean}
   */
  get Textured() {
    return this._textured.Value;
  }

  /**
   * @param {Boolean} value
   */
  set Textured(value) {
    this._textured.Value = value;
  }

  /**
   * @returns {Boolean}
   */
  get LogarithmicDepth() {
    return this._logarithmicDepth.Value;
  }

  /**
   * @param {Boolean} value
   */
  set LogarithmicDepth(value) {
    this._logarithmicDepth.Value = value;
  }

  /**
   * @returns {Number}
   */
  get LogarithmicDepthConstant() {
    return this._logarithmicDepthConstant.Value;
  }

  /**
   * @param {Number} value
   */
  set LogarithmicDepthConstant(value) {
    this._logarithmicDepthConstant.Value = value;
  }

  /**
   * @returns {Ellipsoid}
   */
  get Shape() {
    return this._shape;
  }

  /**
   * @param {Ellipsoid} value
   */
  set Shape(value) {
    this._dirty = true;
    this._shape = value;
  }

  /**
   * @returns {Number}
   */
  get NumberOfSlicePartitions() {
    return this._numberOfSlicePartitions;
  }

  /**
   * @param {Number} value
   */
  set NumberOfSlicePartitions(value) {
    this._dirty = true;
    this._numberOfSlicePartitions = value;
  }

  /**
   * @returns {Number}
   */
  get NumberOfStackPartitions() {
    return this._numberOfStackPartitions;
  }

  /**
   * @param {Number} value
   */
  set NumberOfStackPartitions(value) {
    this._numberOfStackPartitions = value;
  }
}

export default TessellatedGlobe;
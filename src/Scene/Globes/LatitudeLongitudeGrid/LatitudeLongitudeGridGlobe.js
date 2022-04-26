

import Verify from "../../Infrastructure/Verify.js";
import DrawState from "../../../Renderer/DrawState.js";
import GeographicGridEllipsoidTessellator from "../../../Core/Tessellation/GeographicGridEllipsoidTessellator.js";
import Ellipsoid from "../../../Core/Geometry/Ellipsoid.js";
import VertexAttributeComponents from "../../../Core/Tessellation/VertexAttributeComponents.js";
import BufferHint from "../../../Renderer/Buffers/BufferHint.js";
import PrimitiveType from "../../../Core/Geometry/PrimitiveType.js";
import TextureMinificationFilter from "../../../Renderer/Textures/TextureMinificationFilter.js";
import TextureMagnificationFilter from "../../../Renderer/Textures/TextureMagnificationFilter.js";
import TextureWrap from "../../../Renderer/Textures/TextureWrap.js";
import RenderState from "../../../Renderer/RenderState/RenderState.js";
import Shader from "../../Infrastructure/Shader.js";
import List from "../../../Core/List/List.js";
import GridResolution from "./GridResolution.js";
import Vector2D from "../../../Core/Vectors/Vector2D.js";
import Vector3D from "../../../Core/Vectors/Vector3D.js";


class LatitudeLongitudeGridGlobe {
  
  constructor(window) {
    Verify.ThrowIfNull(window);

    this._window = window;
    this._sceneState = this._window.createSceneState();

    this._shape = Ellipsoid.Wgs84;
    this._sceneState.Camera.Eye = new Vector3D(0, 4 * this._shape.MaximumRadius, 0);
    this._sceneState.Camera.PerspectiveNearPlane = 0.01 * this._shape.MaximumRadius;
    this._sceneState.Camera.PerspectiveFarPlane = 10 * this._shape.MaximumRadius;

    const vs = Shader.loadShaderFile("Young/src/Scene/Globes/LatitudeLongitudeGrid/Shaders/globeVS.glsl");
    const fs = Shader.loadShaderFile("Young/src/Scene/Globes/LatitudeLongitudeGrid/Shaders/globeFS.glsl");

    const sp = this._window.createShaderProgram(vs, fs);
    this._gridResolution = sp.Uniforms.getByName("u_gridResolution");
    this._globeOneOverRadiiSquared = sp.Uniforms.getByName("u_globeOneOverRadiiSquared");
    this._gridWidth = sp.Uniforms.getByName("u_gridLineWidth");

    this._drawState = new DrawState();
    this._drawState.ShaderProgram = sp;
    this._drawState.RenderState = new RenderState();

    const sampler = this._window.createTexture2DSampler(
      TextureMinificationFilter.LINEAR,
      TextureMagnificationFilter.LINEAR,
      TextureWrap.REPEAT,
      TextureWrap.REPEAT);
    this._window.Context.TextureUnits.get(0).TextureSampler = sampler;

    this._gridResolutions = null;

    this._dirty = true;
  }

  /**
   * @returns {List<GridResolution>}
   */
  get GridResolutions() {
    return this._gridResolutions;
  }

  /**
   * @param {List<GridResolution>} gridResolutions
   */
  set GridResolutions(gridResolutions) {
    this._gridResolutions = gridResolutions;
  }

  _clean() {
    if (this._dirty) {
      // if (this._drawState.VertexArray !== null) {

      // }

      const mesh = GeographicGridEllipsoidTessellator.Compute(this._shape, 64, 32, VertexAttributeComponents.Position);
      this._drawState.VertexArray = this._window.Context.createVertexArrayByMesh(mesh, this._drawState.ShaderProgram.VertexAttributes, BufferHint.StaticDraw);
      this._globeOneOverRadiiSquared.Value = this._shape.OneOverRadiiSquared;

      this._dirty = false;
    }
  }

  render() {
    this._clean();

    const fieldOfViewY = this._sceneState.Camera.FieldOfViewY;
    for (let i = 0, len = this._gridResolutions.size(); i < len; i++) {
      if (this._gridResolutions.get(i).Interval.contains(fieldOfViewY)) {
        this._gridResolution.Value = this._gridResolutions.get(i).Resolution;
        break;
      }
    }

    const width = this._sceneState.HighResolutionSnapScale;
    this._gridWidth.Value = new Vector2D(width, width);

    this._window.Context.draw(PrimitiveType.Triangles, this._drawState, this._sceneState);
  }

  set Texture(texture) {
    this._window.Context.TextureUnits.get(0).Texture = texture;
  }
}

export default LatitudeLongitudeGridGlobe;
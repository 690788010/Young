

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


class LatitudeLongitudeGridGlobe {
  
  constructor(window) {
    Verify.ThrowIfNull(window);

    this._window = window;
    this._sceneState = this._window.createSceneState();

    const vs = Shader.loadShaderFile("Young/src/Scene/Globes/LatitudeLongitudeGrid/Shaders/globeVS.glsl");
    const fs = Shader.loadShaderFile("Young/src/Scene/Globes/LatitudeLongitudeGrid/Shaders/globeFS.glsl");

    const sp = this._window.createShaderProgram(vs, fs);
    
    this._drawState = new DrawState();
    this._drawState.ShaderProgram = sp;
    this._drawState.RenderState = new RenderState();

    const sampler = this._window.createTexture2DSampler(
      TextureMinificationFilter.LINEAR,
      TextureMagnificationFilter.LINEAR,
      TextureWrap.REPEAT,
      TextureWrap.REPEAT);
    this._window.Context.TextureUnits.get(0).TextureSampler = sampler;

    this._shape = Ellipsoid.ScaledWgs84;
    this._dirty = true;
  }

  _clean() {
    if (this._dirty) {
      // if (this._drawState.VertexArray !== null) {

      // }

      const mesh = GeographicGridEllipsoidTessellator.Compute(this._shape, 64, 32, VertexAttributeComponents.Position);
      this._drawState.VertexArray = this._window.Context.createVertexArrayByMesh(mesh, this._drawState.ShaderProgram.VertexAttributes, BufferHint.StaticDraw);

      this._dirty = false;
    }
  }

  render() {
    this._clean();

    this._window.Context.draw(PrimitiveType.Triangles, this._drawState, this._sceneState);
  }

  set Texture(texture) {
    this._window.Context.TextureUnits.get(0).Texture = texture;
  }
}

export default LatitudeLongitudeGridGlobe;
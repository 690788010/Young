import Ellipsoid from "../../../Core/Geometry/Ellipsoid.js";
import BoxTessellator from "../../../Core/Tessellation/BoxTessellator.js";
import DrawState from "../../../Renderer/DrawState.js";
import RenderState from "../../../Renderer/RenderState/RenderState.js";
import BufferHint from "../../../Renderer/Buffers/BufferHint.js";
import PrimitiveType from "../../../Core/Geometry/PrimitiveType.js";
import Verify from "../../Infrastructure/Verify.js";
import Shader from "../../Infrastructure/Shader.js";
import Vector3D from "../../../Core/Vectors/Vector3D.js";
import TextureMinificationFilter from "../../../Renderer/Textures/TextureMinificationFilter.js";
import TextureMagnificationFilter from "../../../Renderer/Textures/TextureMagnificationFilter.js";
import TextureWrap from "../../../Renderer/Textures/TextureWrap.js";

class RayCastedGlobe {
  constructor(window) {
    Verify.ThrowIfNull(window);

    this._window = window;
    this._sceneState = this._window.createSceneState();
    this._renderState = new RenderState();
    this._sceneState = this._window.createSceneState();

    this._sceneState.Camera.Eye = new Vector3D(0, 6, 0);

    const vs = Shader.loadShaderFile("Young/src/Scene/Globes/RayCasted/Shaders/globeVS.glsl");
    const solidFs = Shader.loadShaderFile("Young/src/Scene/Globes/RayCasted/Shaders/solidShadedGlobeFS.glsl");
    
    const solidSP = this._window.createShaderProgram(vs, solidFs);
    this._cameraEyeSquaredSolid = solidSP.Uniforms.getByName("u_cameraEyeSquared");
    this._useAverageDepthSolid = solidSP.Uniforms.getByName("u_useAverageDepth");

    const fs = Shader.loadShaderFile("Young/src/Scene/Globes/RayCasted/Shaders/globeFS.glsl");
    const sp = this._window.createShaderProgram(vs, fs);
    this._cameraEyeSquared = sp.Uniforms.getByName("u_cameraEyeSquared");
    this._useAverageDepth = sp.Uniforms.getByName("u_useAverageDepth");

    this._drawStateSolid = new DrawState(this._renderState, solidSP, null);
    this._drawState = new DrawState(this._renderState, sp, null);

    const sampler = this._window.createTexture2DSampler(
      TextureMinificationFilter.LINEAR,
      TextureMagnificationFilter.LINEAR,
      TextureWrap.REPEAT,
      TextureWrap.REPEAT);
    this._window.Context.TextureUnits.get(0).TextureSampler = sampler;

    this._shape = Ellipsoid.ScaledWgs84;
    this._shade = false;

    this._dirty = true;
  }

  _clean() {
    if (this._dirty) {

      const mesh = BoxTessellator.Compute(this._shape.Radii.multiply(2));
      console.log(mesh)
      this._va = this._window.Context.createVertexArrayByMesh(mesh, this._drawStateSolid.ShaderProgram.VertexAttributes, BufferHint.StaticDraw);
      this._drawStateSolid.VertexArray = this._va;
      this._drawState.VertexArray = this._va;
      
      this._drawStateSolid.ShaderProgram.Uniforms.getByName("u_globeOneOverRadiiSquared").Value = this._shape.OneOverRadiiSquared;
      this._drawState.ShaderProgram.Uniforms.getByName("u_globeOneOverRadiiSquared").Value = this._shape.OneOverRadiiSquared;
      
      this._dirty = false;
    }
  }

  render() {
    this._clean();

    const eye = this._sceneState.Camera.Eye;
    const cameraEyeSquared = eye.multiplyComponents(eye);
    if (this._shade) {
      this._cameraEyeSquared.Value = cameraEyeSquared;
      this._window.Context.draw(PrimitiveType.Triangles, this._drawState, this._sceneState);
    } else {
      this._cameraEyeSquaredSolid.Value = cameraEyeSquared;
      this._window.Context.draw(PrimitiveType.Triangles, this._drawStateSolid, this._sceneState);
    }
  }

  /**
   * @param {Boolean} value
   */
  set Shade(value) {
    this._shade = value;
  }

  set Texture(texture) {
    this._window.Context.TextureUnits.get(0).Texture = texture;
  }
}

export default RayCastedGlobe;
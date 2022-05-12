/**
 * ContextGL2类
 */

import Context from "../Context.js";
import RenderState from "../RenderState/RenderState.js";
import TextureUnits from "../Textures/TextureUnits.js";
import VertexArray from "../VertexArray/VertexArray.js";
import ViewPort from "../ViewPort.js";
import TextureUnitsGL2 from "./Textures/TextureUnitsGL2.js";
import VertexArrayGL2 from "./VertexArray/VertexArrayGL2.js";
import PrimitiveType from "../../Core/Geometry/PrimitiveType.js";
import DrawState from "../DrawState.js";
import SceneState from "../Scene/SceneState.js";
import TypeConverterGL2 from "./TypeConverterGL2.js";
import DepthTest from "../RenderState/DepthTest.js";
import FaceCulling from "../RenderState/FaceCulling.js";
import Color from "../../Core/Color/Color.js";
import ClearState from "../ClearState/ClearState.js";
import GraphicsWindowGL2 from "./GraphicsWindowGL2.js";
import Blending from "../RenderState/Blending.js";

class ContextGL2 extends Context {
  /**
   * 
   * @param {GraphicsWindowGL2} window 
   * @param {Number} width 
   * @param {Number} height 
   */
  constructor(window, width, height) {
    super();
    this._window = window;
    this._gl = this._window._gl;

    // 保存以下状态信息是为了与ClearState中的颜色信息比较
    this._clearColor = Color.Red;
    this._clearDepth = this._gl.getParameter(this._gl.DEPTH_CLEAR_VALUE);

    // 保存这个RenderState实例用于和传入Draw调用的RenderState
    // 比较，相当于GL状态的副本。如果双方有状态是不同的，才通过GL调用去修改
    this._renderState = new RenderState(this._gl);
    // 保存了一个TextureUnitGL2的集合
    this._textureUnits = new TextureUnitsGL2(this._gl);   

    // 同步GL状态和默认RenderState状态一致
    this._forceApplyRenderState(this._renderState);

    // // 设置视口大小
    this._viewPort = new ViewPort(0, 0, width, height);
    // 更新视口
    this.updateViewPort();

    // 当前使用的ShaderProgram
    this._boundShaderProgram = null;
  }

  /**
  * 创建一个VertexArrayGL2对象
  * @returns {VertexArrayGL2}
  */
  createVertexArray() {
    return new VertexArrayGL2(this._gl);
  }

  /**
   * 获取视口信息
   * @returns {ViewPort}
   */
  get ViewPort() {
    return this._viewPort;
  }

  /**
   * 获取纹理单元信息
   * @returns {Array<TextureUnits>}
   */
  get TextureUnits() {
    return this._textureUnits;
  }

  /**
   * 清除帧缓存
   * @param {ClearState} clearState 
   */
  clear(clearState) {
    // ApplyFramebuffer();

    // ApplyScissorTest(clearState.ScissorTest);
    // ApplyColorMask(clearState.ColorMask);

    if (!this._clearColor.equals(clearState.Color)) {
      this._gl.clearColor(clearState.Color.R, clearState.Color.G, clearState.Color.B, clearState.Color.A);
      this._clearColor = clearState.Color;
    }
    // if (this._clearDepth !== clearState.Depth) {
    //   this._gl.clearDepth(clearState.Depth);
    //   this._clearDepth = clearState.Depth;
    // }
    // if (this._clearStencil != clearState.Stencil) {
    //   this._gl.clearStencil(clearState.Stencil);
    //   this._clearStencil = clearState.Stencil;
    // }
    this._gl.clear(TypeConverterGL2.ClearBuffersToGL(clearState.Buffers));
  }

  /**
   * 绘制
   * @param {PrimitiveType} primitiveType 图元类型
   * @param {DrawState} drawState 
   * @param {SceneState} sceneState
   */
  draw(primitiveType, drawState, sceneState) {
    // 校验参数
    this._verifyDraw(drawState, sceneState);
    // 初始化设置
    this._applyBeforeDraw(drawState, sceneState);

    const vertexArray = drawState.VertexArray;
    const indexBuffer = vertexArray.IndexBuffer;

    if (indexBuffer != null) {
      this._gl.drawElements(
        TypeConverterGL2.PrimitiveTypeTo(primitiveType),
        indexBuffer.Count,
        TypeConverterGL2.IndexDataTypeToGL(indexBuffer.DataType),
        0
      );
    } else {
      this._gl.drawArrays(
        TypeConverterGL2.PrimitiveTypeTo(primitiveType),
        0,
        3
      );
    }
  }

  /**
   * 根据MeshBuffers创建VertexArrayGL2对象
   * @param {MeshBuffers} meshBuffers 
   * @returns {VertexArrayGL2}
   */
  _createVertexArrayByMeshBuffers(meshBuffers) {
    const va = this.createVertexArray();
    va.DisposeBuffers = true;
    va.IndexBuffer = meshBuffers.IndexBuffer;
    for (let i = 0, len = meshBuffers.Attributes.MaximumCount; i < len; i++) {
      va.Attributes.set(i, meshBuffers.Attributes.get(i));
    }
    return va;
  }

  /**
   * 初始化时同步GL状态和默认RenderState状态一致
   * @param {RenderState} renderState 
   */
  _forceApplyRenderState(renderState) {
    // 同步面剔除相关状态信息
    this._enable(this._gl.CULL_FACE, renderState.FaceCulling.Enabled);
    this._gl.cullFace(TypeConverterGL2.CullFaceModeToGL(renderState.FaceCulling.CullFace));
    this._gl.frontFace(TypeConverterGL2.FrontFaceDirectionToGL(renderState.FaceCulling.FrontFace));

    // 同步深度测试相关状态信息
    this._enable(this._gl.DEPTH_TEST, renderState.DepthTest.Enabled);
    this._gl.depthFunc(TypeConverterGL2.DepthTestFunctionToGL(renderState.DepthTest.Function));

    // 同步DepthMask状态信息
    this._gl.depthMask(renderState.DepthMask);

    // 同步混合相关状态信息
    this._enable(this._gl.BLEND, renderState.Blending.Enabled);
    this._gl.blendFuncSeparate(renderState.Blending.SourceRGBFactor, renderState.Blending.DestinationRGBFactor,
      renderState.Blending.SourceAlphaFactor, renderState.Blending.DestinationAlphaFactor);
    this._gl.blendEquationSeparate(renderState.Blending.RgbEquation, renderState.Blending.AlphaEquation);
    this._gl.blendColor(renderState.Blending.BlendColor.R, renderState.Blending.BlendColor.G, 
      renderState.Blending.BlendColor.B, renderState.Blending.BlendColor.A);
  }

  /**
   * 更新视口。
   */
  updateViewPort() {
    this._gl.viewport(this._viewPort.X, this._viewPort.Y,
      this._viewPort.Width, this._viewPort.Height);
  }

  /**
   * 校验参数
   * @param {DrawState} drawState 
   * @param {SceneState} sceneState 
   */
  _verifyDraw(drawState, sceneState) {
    if (!drawState) {
      throw new Error("drawState is null.");
    }
    if (!drawState.RenderState) {
      throw new Error("drawState.RenderState is null.");
    }
    if (!drawState.ShaderProgram) {
      throw new Error("drawState.ShaderProgram is null.");
    }
    if (!drawState.VertexArray) {
      throw new Error("drawState.VertexArray is null.");
    }
    if (!sceneState) {
      throw new Error("sceneState is null.");
    }
  }

  /**
   * 初始化设置
   * @param {DrawState} drawState 
   * @param {SceneState} sceneState 
   */
  _applyBeforeDraw(drawState, sceneState) {
    this._applyRenderState(drawState.RenderState);
    this._applyVertexArray(drawState.VertexArray);
    this._applyShaderProgram(drawState, sceneState);

    this._textureUnits.clean();
    // ApplyFramebuffer();
  }

  /**
   * 设置渲染状态
   * @param {RenderState} renderState 
   */
  _applyRenderState(renderState) {
    // ApplyPrimitiveRestart(renderState.PrimitiveRestart);
    this._applyFaceCulling(renderState.FaceCulling);
    // ApplyProgramPointSize(renderState.ProgramPointSize);
    // ApplyRasterizationMode(renderState.RasterizationMode);
    // ApplyScissorTest(renderState.ScissorTest);
    // ApplyStencilTest(renderState.StencilTest);
    this._applyDepthTest(renderState.DepthTest);
    // ApplyDepthRange(renderState.DepthRange);
    this._applyBlending(renderState.Blending);
    // ApplyColorMask(renderState.ColorMask);
    this._applyDepthMask(renderState.DepthMask);
  }

  /**
   * 使用VertexArray
   * @param {VertexArray} vertexArray 
   */
  _applyVertexArray(vertexArray) {
    // 绑定VertexArray
    vertexArray.bind();
    vertexArray.clean();
  }

  /**
   * 使用ShaderProgram并更新Uniform（包括DrawAutomaticUniform）
   * @param {} drawState 
   * @param {*} sceneState 
   */
  _applyShaderProgram(drawState, sceneState) {
    const shaderProgramGL2 = drawState.ShaderProgram;
    // 使用或更换ShaderProgram
    if (this._boundShaderProgram !== shaderProgramGL2) {
      shaderProgramGL2.use();
      this._boundShaderProgram = shaderProgramGL2;
    }
    // 更新Uniform
    this._boundShaderProgram.clean(this, drawState, sceneState);

    // 验证 WebGLProgram。 它在检查 WebGLProgram 程序是否链接成功的同时还会
    // 检查其是否能在当前的 WebGL 中使用
    this._gl.validateProgram(this._boundShaderProgram.Program.Value);
    if(!this._gl.getProgramParameter(this._boundShaderProgram.Program.Value, this._gl.VALIDATE_STATUS)) {
      throw new Error("Shader program validation failed");
    }
  }

  /**
   * 同步深度测试相关的状态信息
   * @param {DepthTest} depthTest 
   */
  _applyDepthTest(depthTest) {
    if (this._renderState.DepthTest.Enabled !== depthTest.Enabled) {
      this._enable(this._gl.DEPTH_TEST, depthTest.Enabled);
      this._renderState.DepthTest.Enabled = depthTest.Enabled;
    }

    if (depthTest.Enabled) {
      if (this._renderState.DepthTest.Function !== depthTest.Function) {
        this._gl.depthFunc(TypeConverterGL2.DepthTestFunctionToGL(depthTest.Function));
        this._renderState.DepthTest.Function = depthTest.Function;
      }
    }
  }

  /**
   * 同步面剔除相关的状态信息
   * @param {FaceCulling} faceCulling 
   */
  _applyFaceCulling(faceCulling) {
    if (this._renderState.FaceCulling.Enabled !== faceCulling.Enabled) {
      this._enable(this._gl.CULL_FACE, faceCulling.Enabled);
      this._renderState.FaceCulling.Enabled = faceCulling.Enabled;
    }

    if (faceCulling.Enabled) {
      if (this._renderState.FaceCulling.CullFace !== faceCulling.CullFace) {
        this._gl.cullFace(TypeConverterGL2.CullFaceModeToGL(faceCulling.CullFace));
        this._renderState.FaceCulling.CullFace = faceCulling.CullFace;
      }
      if (this._renderState.FrontFace !== faceCulling.FrontFace) {
        this._gl.frontFace(TypeConverterGL2.FrontFaceDirectionToGL(faceCulling.FrontFace));
        this._renderState.FaceCulling.FrontFace = faceCulling.FrontFace;
      }
    }
  }

  /**
   * 同步混合相关的状态信息
   * @param {Blending} blending 
   */
  _applyBlending(blending) {
    if (this._renderState.Blending.Enabled !== blending.Enabled) {
      this._enable(this._gl.BLEND, blending.Enabled);
      this._renderState.Blending.Enabled = blending.Enabled;
    }

    if (blending.Enabled) {
      if ((this._renderState.Blending.SourceRGBFactor !== blending.SourceRGBFactor) ||
          (this._renderState.Blending.DestinationRGBFactor !== blending.DestinationRGBFactor) ||
          (this._renderState.Blending.SourceAlphaFactor !== blending.SourceAlphaFactor) ||
          (this._renderState.Blending.DestinationAlphaFactor !== blending.DestinationAlphaFactor))
      {

        this._gl.blendFuncSeparate(blending.SourceRGBFactor, blending.DestinationRGBFactor,
          blending.SourceAlphaFactor, blending.DestinationAlphaFactor);
        this._renderState.Blending.SourceRGBFactor = blending.SourceRGBFactor;
        this._renderState.Blending.DestinationRGBFactor = blending.DestinationRGBFactor;
        this._renderState.Blending.SourceAlphaFactor = blending.SourceAlphaFactor;
        this._renderState.Blending.DestinationAlphaFactor = blending.DestinationAlphaFactor;
      }

      if ((this._renderState.Blending.RgbEquation !== blending.RgbEquation) ||
          (this._renderState.Blending.AlphaEquation !== blending.AlphaEquation)) 
      {
        this._gl.blendEquationSeparate(blending.RgbEquation, blending.AlphaEquation);
        this._renderState.Blending.RgbEquation = blending.RgbEquation;
        this._renderState.Blending.AlphaEquation = blending.AlphaEquation;
      }

      if (!this._renderState.Blending.BlendColor.equals(blending.BlendColor)) {
        this._gl.blendColor(blending.BlendColor.R, blending.BlendColor.G, 
          blending.BlendColor.B, blending.BlendColor.A);
        this._renderState.Blending.BlendColor = blending.BlendColor;
      }
    }
  }

  /**
   * 同步DepthMask状态信息
   * @param {Boolean} depthMask 
   */
  _applyDepthMask(depthMask) {
    if (this._renderState.DepthMask !== depthMask) {
      this._gl.DepthMask(depthMask);
      this._renderState.DepthMask = depthMask;
    }
  }

  /**
   * 激活或关闭相应的渲染功能
   * @param {EnableCap} enableCap 
   * @param {Boolean} enable 
   */
  _enable(enableCap, enable) {
    if (enable) {
      this._gl.enable(enableCap);
    } else {
      this._gl.disable(enableCap);
    }
  }

  /**
   * @returns {WebGL2RenderingContext}
   */
  get GL() {
    return this._gl;
  }
}

export default ContextGL2;
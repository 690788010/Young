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

class ContextGL2 extends Context {
  constructor(gl, width, height) {
    super();
    this._gl = gl;

    // 保存以下状态信息是为了与ClearState中的颜色信息比较
    this._clearColor = Color.White;
    this._clearDepth = this._gl.getParameter(this._gl.DEPTH_CLEAR_VALUE);

    // 保存这个RenderState实例用于和传入Draw调用的RenderState
    // 比较，相当于GL状态的副本。如果双方有状态是不同的，才通过GL调用去修改
    this._renderState = new RenderState(this._gl);
    this._textureUnits = new TextureUnitsGL2(this._gl);   // 初始化纹理单元

    // 同步GL状态和默认RenderState状态一致
    this._forceApplyRenderState(this._renderState);

    // 设置视口大小
    this._viewPort = new ViewPort(0, 0, width, height);
    // 更新视口
    this.updateViewPort();
  }

  /**
   * 同步GL状态和默认RenderState状态一致
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

  }

  _enable(enableCap, enable) {
    if (enable) {
      this._gl.enable(enableCapm);
    } else {
      this._gl.disable(enableCap);
    }
  }

  /**
   * 更新视口。
   */
  updateViewPort() {
    this._gl.viewport(this._viewPort.X, this._viewPort.Y,
      this._viewPort.Width, this._viewPort.Height);
  }

  /**
   * 获取视口信息
   * @returns {ViewPort}
   */
  get ViewPort() {
    return this._viewPort;
  }

  /**
   * 创建一个VertexArray对象
   * @returns {VertexArray}
   */
  createVertexArray() {
    return new VertexArrayGL2(this._gl);
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
    // ApplyDepthMask(clearState.DepthMask);

    if (!this._clearColor.equals(clearState.Color)) {
      this._gl.clearColor(clearState.Color.R, clearState.Color.G, clearState.Color.B, clearState.Color.A);
      this._clearColor = clearState.Color;
    }
    if (this._clearDepth !== clearState.Depth) {
      this._gl.clearDepth(clearState.Depth);
      this._clearDepth = clearState.Depth;
    }
    if (this._clearStencil != clearState.Stencil) {
      this._gl.clearStencil(clearState.Stencil);
      this._clearStencil = clearState.Stencil;
    }
    this._gl.clear(TypeConverterGL2.ClearBuffersToGL(clearState.Buffers));
  }

  /**
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
    // if (indexBuffer != null) {
      this._gl.clearColor(1.0, 1.0, 1.0, 1);
      this._gl.clear(this._gl.DEPTH_BUFFER_BIT | this._gl.COLOR_BUFFER_BIT)
      // this._gl.drawElements(
      //   TypeConverterGL2.PrimitiveTypeTo(primitiveType),
      //   indexBuffer.Count,
      //   indexBuffer.DataType,
      //   0
      // );
    // } else {
      this._gl.drawArrays(
        TypeConverterGL2.PrimitiveTypeTo(primitiveType),
        0,
        3
      );
    // }
  }

  /**
   * 校验参数
   * @param {DrawState} drawState 
   * @param {SceneState} sceneState 
   */
  _verifyDraw(drawState, sceneState) {
    if (drawState == null) {
      throw new Error("drawState is null.");
    }
    if (drawState.RenderState == null) {
      throw new Error("drawState.RenderState is null.");
    }
    if (drawState.ShaderProgram == null) {
      throw new Error("drawState.ShaderProgram is null.");
    }
    if (drawState.VertexArray == null) {
      throw new Error("drawState.VertexArray is null.");
    }
    if (sceneState == null) {
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
    // ApplyBlending(renderState.Blending);
    // ApplyColorMask(renderState.ColorMask);
    // ApplyDepthMask(renderState.DepthMask);
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
   * 使用VertexArray
   * @param {VertexArray} vertexArray 
   */
  _applyVertexArray(vertexArray) {
    console.log("_applyVertexArray")
    // 绑定VertexArray
    vertexArray.bind();
    vertexArray.clean();
  }

  _applyShaderProgram(drawState, sceneState) {
    console.log("_applyShaderProgram")
    const shaderProgramGL2 = drawState.ShaderProgram;
    if (this._boundShaderProgram !== shaderProgramGL2) {
      shaderProgramGL2.use();
      this._boundShaderProgram = shaderProgramGL2;
    }
    // _boundShaderProgram.Clean(this, drawState, sceneState);

    // 验证 WebGLProgram。 它在检查 WebGLProgram 程序是否链接成功的同时还会
    // 检查其是否能在当前的 WebGL 中使用
    this._gl.validateProgram(this._boundShaderProgram.Program.Value);
    if(!this._gl.getProgramParameter(this._boundShaderProgram.Program.Value, this._gl.VALIDATE_STATUS)) {
      throw new Error("Shader program validation failed");
    }
  }
}

export default ContextGL2;
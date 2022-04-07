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

class ContextGL2 extends Context {
  constructor(gl, width, height) {
    super();
    this._gl = gl;

    this._renderState = new RenderState(this._gl);    // 初始化渲染状态
    this._textureUnits = new TextureUnitsGL2(this._gl);   // 初始化纹理单元

    // 设置视口大小
    this._viewPort = new ViewPort(0, 0, width, height);
    // 更新视口
    this.updateViewPort();
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
    console.log("_applyRenderState");
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
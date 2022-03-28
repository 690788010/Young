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
    this.updateViewPort(this._gl);
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
    if (indexBuffer != null) {
      this._gl.drawElements(
        TypeConverterGL2.PrimitiveTypeTo(primitiveType),
        indexBuffer.Count,
        indexBuffer.DataType,
        0
      );
    } else {
      gl.drawArrays(
        TypeConverterGL2.PrimitiveTypeTo(primitiveType),
        0,
        vertexArray
      );
    }
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

  }
}

export default ContextGL2;
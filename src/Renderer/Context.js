/**
 * Context类是一个抽象类
 * Context类用于封装图形学API的上下文
 */

import ClearState from "./ClearState/ClearState.js";
import PrimitiveType from "../Core/Geometry/PrimitiveType.js";
import DrawState from "./DrawState.js";
import SceneState from "./Scene/SceneState.js";

class Context {

  /**
   * 抽象方法，创建VertexArray对象
   */
  createVertexArray() {}

  /**
   * 为Mesh创建对应的VertexArray
   * @param {Mesh} mesh 
   * @param {ShaderVertexAttributeCollection} shaderAttributes 
   * @param {BufferHint} usageHint 
   */
  createVertexArrayByMesh(mesh, shaderAttributes, usageHint) {
    return this._createVertexArrayByMeshBuffers(
      this._window.createMeshBuffers(mesh, shaderAttributes, usageHint));
  }

  /**
   * 抽象方法，获取视口信息
   * @returns {ViewPort}
   */
  get ViewPort() {}

  /**
   * 抽象方法，获取纹理单元信息
   * @returns {Array<TextureUnits>}
   */
  get TextureUnits() {}

  /**
   * 抽象方法，清除帧缓存
   * @param {ClearState} clearState
   */
  clear(clearState) {}

  /**
   * 抽象方法，绘制
   * @param {PrimitiveType} primitiveType 图元类型
   * @param {DrawState} drawState 
   * @param {SceneState} sceneState
   */
  draw(primitiveType, drawState, sceneState) {}
}

export default Context;
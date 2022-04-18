/**
 * Context类是一个抽象类
 * Context类用于封装图形学API的上下文
 */

import MeshBuffers from "./Mesh/MeshBuffers.js";
import Mesh from "../Core/Geometry/Mesh.js";
import ShaderVertexAttributeCollection from "./Shaders/ShaderVertexAttributeCollection.js";
import BufferHint from "./Buffers/BufferHint.js";
import Device from "./Device.js";
import ClearState from "./ClearState/ClearState.js";
import GraphicsWindowGL2 from "./GL2/GraphicsWindowGL2.js";

class Context {

  /**
   * 抽象方法，创建VertexArray
   */
  createVertexArray() {}

  /**
   * 抽象方法，清除帧缓存
   * @param {ClearState} clearState
   */
  clear(clearState) {}
}

export default Context;
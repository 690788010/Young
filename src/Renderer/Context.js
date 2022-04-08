/**
 * Context类是一个抽象类
 * Context类用于封装图形学API的上下文
 */

import MeshBuffers from "./Mesh/MeshBuffers.js";
import Mesh from "../Core/Geometry/Mesh.js";
import ShaderVertexAttributeCollection from "./ShaderVertexAttributeCollection.js";
import BufferHint from "./Buffers/BufferHint.js";
import Device from "./Device.js";
import ClearState from "./ClearState/ClearState.js";

class Context {

  /**
   * 为Mesh创建对应的VertexArray
   * @param {Mesh} mesh 
   * @param {ShaderVertexAttributeCollection} shaderAttributes 
   * @param {BufferHint} usageHint 
   */
  createVertexArrayByMesh(mesh, shaderAttributes, usageHint) {
    return this._createVertexArrayByMeshBuffers(
      Device.CreateMeshBuffers(mesh, shaderAttributes, usageHint));
  }

  /**
   * 
   * @param {MeshBuffers} meshBuffers 
   */
  _createVertexArrayByMeshBuffers(meshBuffers) {
    const va = this.createVertexArray();
    va.DisposeBuffers = true;
    va.IndexBuffer = meshBuffers.IndexBuffer;
    for (let i = 0, len = meshBuffers.Attributes.count(); i < len; i++) {
      va.Attributes.set(i, meshBuffers.Attributes.get(i));
    }
    return va;
  }

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
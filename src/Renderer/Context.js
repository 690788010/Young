/**
 * Context类是一个抽象类
 * Context类用于封装图形学API的上下文
 */

import MeshBuffers from "./Mesh/MeshBuffers.js";
import Mesh from "../Core/Geometry/Mesh.js";
import ShaderVertexAttributeCollection from "./ShaderVertexAttributeCollection.js";
import BufferHint from "./Buffers/BufferHint.js";
import Device from "./Device.js";

class Context {


  /**
   * 
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

  }
}

export default Context;
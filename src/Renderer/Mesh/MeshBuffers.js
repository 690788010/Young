/**
 * MeshBuffers类
 */

import IndexBuffer from "../Buffers/IndexBuffer.js";
import MeshVertexBufferAttributes from "./MeshVertexBufferAttributes.js";

class MeshBuffers {
  constructor() {
    this._attributes = new MeshVertexBufferAttributes();
  }

  /**
   * @returns {Array<MeshVertexBufferAttributes>}
   */
  get Attributes() {
    return this._attributes;
  }

  /**
   * 设置索引缓冲区
   * @param {IndexBuffer}
   */
  set IndexBuffer(value) {
    this._indexBuffer = value;
  }

  /**
   * 获取索引缓冲区
   * @param {IndexBuffer}
   */
  get IndexBuffer() {
    if (this._indexBuffer) {
      return this._indexBuffer;
    }
  }
}

export default MeshBuffers;
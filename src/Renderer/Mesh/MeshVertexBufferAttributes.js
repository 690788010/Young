/**
 * MeshVertexBufferAttributes类
 */

import Device from "../Device.js";
import VertexBufferAttributes from "../VertexArray/VertexBufferAttributes.js";
import VertexBufferAttribute from "../VertexArray/VertexBufferAttribute.js";

class MeshVertexBufferAttributes extends VertexBufferAttributes {
  constructor() {
    super();

    this._attributes = new Array(Device.MaximumNumberOfVertexAttributes);
  }

  /**
   * 根据索引获取元素
   * @param {Number} index
   * @returns {VertexBufferAttribute} 
   */
  get(index) {
    return this._attributes[index];
  }

  /**
   * 基于索引设置元素
   * @param {Number} index 
   * @param {VertexBufferAttribute} value 
   */
  set(index, value) {
    this._attributes[index] = value;
  }
}

export default MeshVertexBufferAttributes;
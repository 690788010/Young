/**
 * MeshVertexBufferAttributes类
 */

import Device from "../Device.js";
import VertexBufferAttributes from "../VertexArray/VertexBufferAttributes.js";
import VertexBufferAttribute from "../VertexArray/VertexBufferAttribute.js";

class MeshVertexBufferAttributes extends VertexBufferAttributes {
  constructor() {
    super();

    this._attributes = new Array(Device.MAX_VERTEX_ATTRIBS);
    this._count = 0;
  }

  /**
   * 返回有效的VertexBufferAttribute元素的个数
   * @returns {Number}
   */
  get Count() {
    return this._count;
  }

  /**
   * 返回数组的长度
   * @returns {Number}
   */
  get MaximumCount() {
    return this._attributes.length;
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
    if ((this._attributes[index]) && (value === null)) {
      this._count--;
    } else if ((!this._attributes[index]) && (value !== null)) {
      this._count++;
    }
    this._attributes[index] = value;
  }
}

export default MeshVertexBufferAttributes;
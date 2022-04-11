/**
 * VertexAttribute是一个抽象类
 */

import VertexAttributeType from "./VertexAttributeType.js";

class VertexAttribute {
  /**
   * 获取VertexAttribute的名字
   * @returns {String}
   */
  get Name() {
    return this._name;
  }

  /**
   * 获取VertexAttribute的数据类型
   * @returns {VertexAttributeType}
   */
  get DataType() {
    return this._dataType;
  }
}

export default VertexAttribute;
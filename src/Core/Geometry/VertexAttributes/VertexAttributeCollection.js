/**
 * VertexAttributeCollection类是一个包含多个VertexAttribute对象的集合类
 */

import VertexAttribute from "./VertexAttribute.js";

class VertexAttributeCollection {
  constructor() {
    this._values = [];
  }

  /**
   * 向集合中添加一个VertexAttribute对象
   * @param {VertexAttribute} item 
   */
  add(item) {
    this._values.push(item);
  }
}

export default VertexAttributeCollection;
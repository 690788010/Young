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

  /**
   * 通过名字判断是否包含特定元素
   * @param {String} name
   */
  contains(name) {
    for (let i = 0, len = this._values.length; i < len; i++) {
      if (this._values[i].Name === name) {
        return true;
      }
    }
    return false;
  }

  /**
   * 通过名字获取对应元素
   * @param {String} name 
   * @returns {VertexAttribute}
   */
  getByName(name) {
    for (let i = 0, len = this._values.length; i < len; i++) {
      if (this._values[i].Name === name) {
        return this._values[i];
      }
    }
  }
}

export default VertexAttributeCollection;
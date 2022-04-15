/**
 * VertexAttribute是一个基类
 */

import VertexAttributeType from "./VertexAttributeType.js";
import List from "../../List/List.js";

class VertexAttribute {
  /**
   * 
   * @param {String} name 
   * @param {VertexAttributeType} type 
   */
  constructor(name, type) {
    this._name = name;
    this._dataType = type;
    this._values = new List();
  }

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

  /**
   * 获取VertexAttribute包含的List
   */
   get Values() {
    return this._values;
  }
}

export default VertexAttribute;
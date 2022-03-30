/**
 * IndicesUnsignedShort类是IndicesBase抽象类
 * 的Unsigned Short数据类型的实现类
 */

import IndicesBase from "./IndicesBase.js";
import IndicesType from "./IndicesType.js";
import TriangleIndicesUnsignedShort from "./TriangleIndicesUnsignedShort.js";

class IndicesUnsignedShort extends IndicesBase {
  constructor(capacity) {
    super();
    this._indicesType = IndicesType.UnsignedShort;

    this._capacity = capacity;
    this._values = [];
  }

  /**
   * 添加一个索引数据
   * @param {Number} index 
   */
  add(index) {
    this._values.push(index);
  }

  /**
   * 添加一整个三角形的索引
   * @param {TriangleIndicesUnsignedShort} triangle 
   */
  addTriangle(triangle) {
    this._values.push(triangle.UI0);
    this._values.push(triangle.UI1);
    this._values.push(triangle.UI2);
  }
}

export default IndicesUnsignedShort;
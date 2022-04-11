/**
 * IndicesBase类是一个抽象类
 */
 import IndicesType from "./IndicesType.js";
 import TriangleIndices from "./TriangleIndices.js";

class IndicesBase {

  /**
   * 返回索引的数据类型
   * @returns {IndicesType}
   */
  get DataType() {
    return this._indicesType;
  }

  /**
   * 返回数据个数
   * @returns {Number}
   */
   size() {
    return this._values.length;
  }

  /**
   * 添加一个索引数据
   * @param {Number} item
   */
  add(item) {
    this._values.push(item);
  }

  /**
   * 根据索引取值
   * @returns {Number} 
   */
  get(index) {
    return this._values[index];
  }

  /**
   * @returns {Array<Number>}
   */
  get Values() {
    return this._values;
  }

  /**
   * 添加一整个三角形的索引
   * @param {TriangleIndices} triangle 
   */
  addTriangle(triangle) {
    this._values.push(triangle.UI0);
    this._values.push(triangle.UI1);
    this._values.push(triangle.UI2);
  }
}

export default IndicesBase;
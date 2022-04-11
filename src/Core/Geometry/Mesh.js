/**
 * Mesh类
 */

import IndicesBase from "./Indices/IndicesBase.js";
import VertexAttributeCollection from "./VertexAttributes/VertexAttributeCollection.js";
import PrimititveType from "./PrimitiveType.js";
import WindingOrder from "./WindingOrder.js";

class Mesh {
  constructor() {
    this._attributes = new VertexAttributeCollection();
    this._indices = null;
    this._primitiveType = PrimititveType.Triangles;
    this._windingOrder = WindingOrder.CCW;
  } 

  /**
   * 获取VertexAttributeCollection集合类对象
   * @returns {VertexAttributeCollection}
   */
  get Attributes() {
    return this._attributes;
  }

  /**
   * 设置索引数据
   * @param {IndicesBase} value
   */
  set Indices(value) {
    this._indices = value;
  }

  /**
   * 获取索引数据
   * @returns {IndicesBase}
   */
  get Indices() {
    if (this._indices) {
     return this._indices;
    }
  }

  /**
   * 获取图元类型
   * @returns {PrimititveType}
   */
  get PrimititveType() {
    return this._primitiveType;
  }

  /**
   * 设置图元类型
   * @param {PrimititveType} primitiveType
   */
  set PrimititveType(primitiveType) {
    this._primitiveType = primitiveType;
  }

  /**
   * 获取图元正面的顶点环绕顺序
   * @returns {WindingOrder}
   */
  get WindingOrder() {
    return this._windingOrder;
  }

  /**
   * 设置图元正面的顶点环绕顺序
   * @param {WindingOrder} windingOrder
   */
  set WindingOrder(windingOrder) {
    this._windingOrder = windingOrder;
  }
}

export default Mesh;
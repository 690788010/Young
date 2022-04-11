/**
 * IndicesUnsignedShort类是IndicesBase抽象类
 * 的Unsigned Short数据类型的实现类
 */

import IndicesBase from "./IndicesBase.js";
import IndicesType from "./IndicesType.js";
import TriangleIndicesUnsignedShort from "./TriangleIndices.js";

class IndicesUnsignedShort extends IndicesBase {
  constructor() {
    super();
    this._indicesType = IndicesType.UnsignedShort;

    this._values = [];
  }
}

export default IndicesUnsignedShort;
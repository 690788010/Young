/**
 * IndicesBase类是一个抽象类
 */
 import IndicesType from "./IndicesType.js";

class IndicesBase {

  /**
   * 返回索引的数据类型
   * @returns {IndicesType}
   */
  get DataType() {
    return this._indicesType;
  }
}

export default IndicesBase;
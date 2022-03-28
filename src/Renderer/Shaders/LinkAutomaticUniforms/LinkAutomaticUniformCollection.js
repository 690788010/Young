/**
 * LinkAutomaticUniformCollection类
 */

import LinkAutomaticUniform from "./LinkAutomaticUniform.js";

class LinkAutomaticUniformCollection {
  constructor() {
    this._values = [];
  }

  /**
   * 添加一个LinkAutomaticUniform对象
   * @param {LinkAutomaticUniform} item 
   */
   add(item) {
    this._values.push(item);
  }

  /**
   * 返回集合的长度
   * @returns {Number}
   */
   size() {
    this._values.length;
  }

  /**
   * 根据索引取得Uniform
   * @param {Number} index 索引
   * @returns {LinkAutomaticUniform}
   */
  get(index) {
    return this._values[index];
  }
}

export default LinkAutomaticUniformCollection;
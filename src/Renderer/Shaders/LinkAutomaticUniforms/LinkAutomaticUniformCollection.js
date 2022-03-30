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

  /**
   * 根据Uniform变量名判断集合中是否包含该Uniform
   * @param {String} name Uniform变量的名字
   * @returns {Boolean}
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
   * 通过Uniform变量名获取特定LinkAutomaticUniform
   * @param {String} name Uniform变量的名字
   * @returns {LinkAutomaticUniform}
   */
  getByName(name) {
    for (let i = 0, len = this._values.length; i < len; i++) {
      if (this._values[i].Name === name) {
        return this._values[i];
      }
    }
  }
}

export default LinkAutomaticUniformCollection;
/**
 * DrawAutomaticUniformFactoryCollection类是一个用于包含多个
 * DrawAutomaticUniformFactory对象的集合类
 */

import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";

class DrawAutomaticUniformFactoryCollection {
  constructor() {
    this._values = [];
  }

  /**
   * 向集合中添加一个DrawAutomaticUniformFactory对象
   * @param {DrawAutomaticUniformFactory} item 
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
   * 根据索引取得DrawAutomaticUniformFactory
   * @param {Number} index 索引
   * @returns {DrawAutomaticUniformFactory}
   */
   get(index) {
    return this._values[index];
  }

  /**
   * 根据DrawAutomaticUniformFactory的名字信息判断集合中是否包含该DrawAutomaticUniformFactory
   * @param {String} name DrawAutomaticUniformFactory的名字信息
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

export default DrawAutomaticUniformFactoryCollection;
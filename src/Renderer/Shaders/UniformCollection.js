/**
 * UniformCollection类是一个集合，用于包含多个Uniform对象
 */

import Uniform from "../Shaders/Uniform.js";

class UniformCollection {
  constructor() {
    this._values = [];
  }

  /**
   * 添加一个Uniform对象
   * @param {Uniform} item 
   */
  add(item) {
    this._values.push(item);
  }

  /**
   * 返回集合的长度
   * @returns {Number}
   */
  size() {
    return this._values.length;
  }

  /**
   * 根据索引取得Uniform
   * @param {Number} index 索引
   */
  get(index) {
    return this._values[index];
  }

  /**
   * 通过Uniform变量名获取特定Uniform
   * @param {String} name Uniform变量的名字
   * @returns {Uniform}
   */
   getByName(name) {
    for (let i = 0, len = this._values.length; i < len; i++) {
      if (this._values[i].Name === name) {
        return this._values[i];
      }
    }
  }
}

export default UniformCollection;
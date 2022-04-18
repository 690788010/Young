/**
 * Uniform类是基类，用于表示Uniform变量
 */

import UniformType from "./UniformType.js";

class Uniform {
  /**
   * 构造函数
   * @param {String} name 
   * @param {UniformType} type 
   */
  constructor(name, type) {
    this._name = name;
    this._type = type;
  }

  /**
   * @returns {String}
   */
  get Name() {
    return this._name;
  }

  /**
   * @returns {UniformType}
   */
  get DataType() {
    return this._type;
  }
  
  /**
   * 抽象方法
   * @returns {Object}
   */
  get Value() {}

  /**
   * 抽象方法
   * @param {Object}
   */
  set Value(value) {}
}

export default Uniform;
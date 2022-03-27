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
}
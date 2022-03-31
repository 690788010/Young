/**
 * ShaderVertexAttributeCollection类
 */

import ShaderVertexAttribute from "./Shaders/ShaderVertexAttribute.js";

class ShaderVertexAttributeCollection {
  constructor() {
    this._values = [];
  }

  /**
   * 添加一个ShaderVertexAttribute对象
   * @param  {ShaderVertexAttribute} item
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
   * 通过索引访问元素
   * @param {Number} index 
   */
  get(index) {
    return this._values[index];
  }

  
}

export default ShaderVertexAttributeCollection;
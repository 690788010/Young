/**
 * ShaderVertexAttribute类是顶点着色器中attribute属性的描述（元数据）
 */

import ShaderVertexAttributeType from "../Shaders/ShaderVertexAttributeType.js";

class ShaderVertexAttribute {
  /**
   * 构造函数
   * @param {String} name attribute属性名
   * @param {Number} location attribute属性的索引位置
   * @param {ShaderVertexAttributeType} type attribute属性的类型
   * @param {Number} length attribute属性的所占空间大小，单位字节
   */
  constructor(name, location, type, length) {
    this._name = name;    // attribute属性名
    this._location = location;    // attribute属性的索引位置
    this._type = type;    // attribute属性的数据类型
    this._length = length;    // attribute属性的大小，单位字节
  }

  /**
   * @returns {String}
   */
  get Name() {
    return this._name;
  }

  /**
   * @returns {Number}
   */
  get Location() {
    return this._location;
  }

  /**
   * @returns {ShaderVertexAttributeType}
   */
  get Type() {
    return this._type;
  }

  /**
   * @returns {Number}
   */
  get Length() {
    return this._length;
  }
}

export default ShaderVertexAttribute;
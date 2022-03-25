/**
 * ShaderVertexAttributeCollection类
 */

import ShaderVertexAttribute from "./Shaders/ShaderVertexAttribute";

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
}

export default ShaderVertexAttributeCollection;
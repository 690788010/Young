/**
 * VertexBufferAttributes类是一个抽象类，它用于包含多个VertexBufferAttribute对象
 */

import VertexBufferAttribute from "./VertexBufferAttribute";

class VertexBufferAttributes {
  
  /**
   * 抽象方法，获取有效VertexBufferAttribute的数量
   * @returns {Number}
   */
  get Count() {}

  /**
   * 抽象方法
   * @returns {Number}
   */
  get MaximumCount() {}

  /**
   * 抽象方法
   * @param {Number} index 
   * @returns {VertexBufferAttribute}
   */
  get(index) {}

  /**
   * 抽象方法
   * @param {Number} index 
   * @param {VertexBufferAttribute} value 
   */
  set(index, value) {}
}

export default VertexBufferAttributes;
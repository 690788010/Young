/**
 * VertexBufferAttribute类是一个抽象类，它包含了各个顶点attribute属性的
 * 配置信息以及对应的顶点缓冲区（VertexBuffer）
 */

class VertexBufferAttribute {
  /**
   * 抽象方法，用于比较两个VertexBufferAttribute是否相等
   * @param {VertexBufferAttribute}
   * @returns {Boolean}
   */
  equals(other) {}
  
  /**
   * 抽象方法
   * @returns {Boolean}
   */
  get Dirty() {}

  /**
   * 抽象方法
   * @param {Boolean}
   */
  set Dirty(value) {}
}

export default VertexBufferAttribute;
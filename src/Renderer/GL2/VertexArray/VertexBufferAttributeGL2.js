/**
 * VertexBufferAttributeGL2类是VertexBufferAttribute抽象类基于WebGL2的实现类
 * VertexBufferAttribute类是一个抽象类，它包含了各个顶点attribute属性的
 * 配置信息以及对应的顶点缓冲区（VertexBuffer）
 */

import VertexBufferAttribute from "../../VertexArray/VertexBufferAttribute.js";
import VertexBuffer from "../../Buffers/VertexBuffer.js"
import ComponentDatatype from "../../VertexArray/ComponentDatatype.js"

class VertexBufferAttributeGL2 extends VertexBufferAttribute {
  /**
   * 
   * @param {VertexBuffer} vertexBuffer 顶点缓冲
   * @param {ComponentDatatype} componentDatatype attribute属性分量的数据类型
   * @param {Number} numberOfComponents attribute属性分量的数量
   * @param {Boolean} normalize 是否应该将数值归一化到特定的范围
   * @param {Number} offsetInBytes 偏移量，单位字节
   * @param {Number} strideInBytes 连续顶点属性之间的偏移量，单位字节
   */
  constructor(vertexBuffer, componentDatatype, numberOfComponents,
    normalize = false, offsetInBytes = 0, strideInBytes = 0) {
    super();

    if (numberOfComponents <= 0) {
      throw new Error("numberOfComponents must be greater than zero.");
    }
    if (offsetInBytes < 0) {
      throw new Error("offsetInBytes must be greater than or equal to zero.");
    }
    if (strideInBytes < 0) {
      throw new Error("stride must be greater than or equal to zero.");
    }

    this._vertexBuffer = vertexBuffer;
    this._componentDatatype = componentDatatype;
    this._numberOfComponents = numberOfComponents;
    this._normalize = normalize;
    this._offsetInBytes = offsetInBytes;
    this._strideInBytes = strideInBytes;

    // 标识新值是否被GL调用更新，true为否
    this._dirty = true;
  }

  /**
   * @returns {VertexBuffer}
   */
   get VertexBuffer() {
    return this._vertexBuffer;
  }

  /**
   * @returns {ComponentDatatype}
   */
  get ComponentDatatype() {
    return this._componentDatatype;
  }

  /**
   * @returns {Number}
   */
  get NumberOfComponents() {
    return this._numberOfComponents;
  }

  /**
   * @returns {Boolean}
   */
  get Normalize() {
    return this._normalize;
  }

  /**
   * @returns {Number}
   */
  get OffsetInBytes() {
    return this._offsetInBytes;
  }

  /**
   * @returns {Number}
   */
  get StrideInBytes() {
    return this._strideInBytes;
  }

  /**
   * @returns {Boolean}
   */
  get Dirty() {
    return this._dirty;
  }

  /**
   * @param {Boolean} value
   */
  set Dirty(value) {
    this._dirty = value;
  }

  /**
   * 抽象方法，用于比较两个VertexBufferAttribute是否相等
   * @param {VertexBufferAttributeGL2}
   * @returns {Boolean}
   */
  equals(other) {
    if (!(other instanceof VertexBufferAttributeGL2)) return false;
    if (this.VertexBuffer !== other.VertexBuffer) return false;
    if (this.ComponentDatatype !== other.ComponentDatatype) return false;
    if (this.NumberOfComponents !== other.NumberOfComponents) return false;
    if (this.Normalize !== other.Normalize) return false;
    if (this.OffsetInBytes !== other.OffsetInBytes) return false;
    if (this.StrideInBytes !== other.StrideInBytes) return false;
    return true;
  }
}

export default VertexBufferAttributeGL2;
/**
 * VertexBufferAttributesGL2类是VertexBufferAttributes抽象类的基于WebGL的实现类
 * VertexBufferAttributes类是一个抽象类，它用于包含多个VertexBufferAttribute对象
*/

import VertexBufferAttribute from "../../VertexArray/VertexBufferAttribute.js";
import VertexBufferAttributes from "../../VertexArray/VertexBufferAttributes.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";

class VertexBufferAttributesGL2 extends VertexBufferAttributes {
  constructor(gl) {
    super();

    this._gl = gl;
    this._attributes = [];
    this._maximumArrayIndex = 0;
  }

  get MaximumArrayIndex() {
    return this._maximumArrayIndex;
  }

  /**
   * 
   * @param {Number} index 
   * @returns {VertexBufferAttribute}
   */
  get(index) {
    return this._attributes[index];
  }
  
  /**
   * 
   * @param {Number} index 
   * @param {VertexBufferAttribute} value 
   */
  set(index, value) {
    this._dirty = true;
    return this._attributes[index] = value;
  }

  clean() {
    if (this._dirty) {
      let maximumArrayIndex = 0;
      for (let i = 0, len = this._attributes.length; i < len; i++) {
        const attribute = this._attributes[i];
        if (attribute.Dirty) {
          this._attach(i);
          attribute.Dirty = false;
        }
      }
      this._dirty = false;
    }
  }

  _attach(index) {
    this._gl.enableVertexAttribArray(index);
    const attribute = this._attributes[index];
    const vertexBuffer = attribute.VertexBuffer;

    vertexBuffer.bind();
    this._gl.vertexAttribPointer(index, attribute.NumberOfComponents,
      TypeConverterGL2.ComponentDataTypeTo(attribute.ComponentDatatype),
      attribute.Normalize, attribute.StrideInBytes, attribute.OffsetInBytes);
  }
}

export default VertexBufferAttributesGL2;
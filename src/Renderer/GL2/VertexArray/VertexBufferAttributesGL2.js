/**
 * VertexBufferAttributesGL2类是VertexBufferAttributes抽象类的基于WebGL的实现类
 * VertexBufferAttributes类是一个抽象类，它用于包含多个VertexBufferAttribute对象
*/

import VertexAttribute from "../../../Core/Geometry/VertexAttributes/VertexAttribute.js";
import VertexBufferAttributes from "../../VertexArray/VertexBufferAttributes.js";

class VertexBufferAttributesGL2 extends VertexBufferAttributes {
  constructor() {
    super();

    this._attributes = [];
    this._maximumArrayIndex = 0;
  }

  get MaximumArrayIndex() {
    return this._maximumArrayIndex;
  }

  /**
   * 
   * @param {Number} index 
   * @returns {VertexAttribute}
   */
  get(index) {
    return this._attributes[index];
  }
  
  /**
   * 
   * @param {Number} index 
   * @param {VertexAttribute} value 
   */
  set(index, value) {
    return this._attributes[index] = value;
  }
}

export default VertexBufferAttributesGL2;
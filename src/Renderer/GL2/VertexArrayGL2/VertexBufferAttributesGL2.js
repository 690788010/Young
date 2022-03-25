/**
 * VertexBufferAttributesGL2类是VertexBufferAttributes抽象类的基于WebGL的实现类
 * VertexBufferAttributes类是一个抽象类，它用于包含多个VertexBufferAttribute对象
*/

import VertexBufferAttributes from "../../VertexArray/VertexBufferAttributes";

class VertexBufferAttributesGL2 extends VertexBufferAttributes {
  constructor() {
    super();

    this._attributes = [];
  }
}

export default VertexBufferAttributesGL2;
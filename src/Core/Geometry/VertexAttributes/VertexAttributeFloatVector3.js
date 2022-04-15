/**
 * VertexAttributeFloatVector3类是VertexAttribute基类针对FloatVector3
 * 类型的实现类
 */

import VertexAttribute from "./VertexAttribute.js";
import VertexAttributeType from "./VertexAttributeType.js";

class VertexAttributeFloatVector3 extends VertexAttribute {
  constructor(name) {
    super(name, VertexAttributeType.FloatVector3);
  }
}

export default VertexAttributeFloatVector3;
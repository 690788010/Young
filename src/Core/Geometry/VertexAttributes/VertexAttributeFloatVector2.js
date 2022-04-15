/**
 * VertexAttributeFloatVector3类是VertexAttribute基类针对FloatVector2
 * 类型的实现类
 */

import VertexAttribute from "./VertexAttribute.js";
import VertexAttributeType from "./VertexAttributeType.js";

class VertexAttributeFloatVector2 extends VertexAttribute{
  constructor(name) {
    super(name, VertexAttributeType.FloatVector2);
  }
}

export default VertexAttributeFloatVector2;
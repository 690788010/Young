/**
 * VertexAttributeFloatVector3类是VertexAttribute抽象类针对FloatVector3
 * 类型的实现类
 */

import VertexAttribute from "./VertexAttribute.js";
import VertexAttributeType from "./VertexAttributeType.js";
import Vector3 from "../../Vectors/Vector3D.js";
import List from "../../List/List.js";

class VertexAttributeFloatVector3 extends VertexAttribute {
  constructor(name) {
    super();
    this._dataType = VertexAttributeType.FloatVector3;

    this._name = name;
    this._values = new List();
  }

  /**
   * 获取VertexAttributeFloatVector3的数据值
   */
  get Values() {
    return this._values;
  }

  /**
   * 添加数据
   * @param {Vector3} item 
   */
  add(item) {
    this._values.add(item);
  }
}

export default VertexAttributeFloatVector3;
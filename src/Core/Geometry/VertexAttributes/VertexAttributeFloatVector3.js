/**
 * VertexAttributeFloatVector3类是VertexAttribute抽象类针对FloatVector3
 * 类型的实现类
 */

import VertexAttribute from "./VertexAttribute.js";
import VertexAttributeType from "./VertexAttributeType.js";
import Vector3 from "../../Vectors/Vector3D.js";

class VertexAttributeFloatVector3 extends VertexAttribute{
  constructor(name, capacity) {
    super();
    this._dataType = VertexAttributeType.FloatVector3;

    this._name = name;
    this._capacity = capacity;
    this._values = [];
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
    this._values.push(item);
  }
}

export default VertexAttributeFloatVector3;
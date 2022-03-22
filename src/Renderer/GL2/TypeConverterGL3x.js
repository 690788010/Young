/**
 * TypeConverterGL3x
 */

import ShaderVertexAttributeType from "../Shaders/ShaderVertexAttributeType.js";

class TypeConverterGL3x {
  /**
   * 将着色器Attribute变量的类型映射为自定义的类型
   * @param  {Number} type
   * @param  {String}
   */
  static AttributeTo(type) {
    switch (type) {
      case 35666: 
        return ShaderVertexAttributeType.FloatVector4;
    }
  }
}

export default TypeConverterGL3x;
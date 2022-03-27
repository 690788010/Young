import Uniform from "../../Shaders/Uniform.js";
import UniformType from "../../Shaders/UniformType.js";


class UniformGL2 extends Uniform {
  /**
   * 
   * @param {String} name Uniform变量名
   * @param {UniformType} type Uniform变量的数据类型
   * @param {WebGLUniformLocation} location Uniform变量的位置索引
   */
  constructor(name, type, location) {
    super();

    this._name = name;
    this._type = type;
    this._location = location;
  }
}

export default UniformGL2;
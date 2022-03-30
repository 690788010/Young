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
    this._dirty = true;
  }

  /**
   * 返回Uniform变量的名字
   * @returns {String}
   */
  get Name() {
    return this._name;
  }

  /**
   * 返回Unform变量的值
   */
  get Value() {
    this._value;
  }

  /**
   * 设置Uniform变量的值
   */
  set Value(value) {
    if (!this._dirty && (this._value !== value)) {
      this._dirty = true;
    }
    this._value = value;
  }
}

export default UniformGL2;
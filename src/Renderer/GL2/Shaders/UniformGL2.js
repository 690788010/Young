/**
 * UniformGL2类是Uniform抽象类的实现类
 * 表示Uniform变量
 */

import Uniform from "../../Shaders/Uniform.js";
import UniformType from "../../Shaders/UniformType.js";


class UniformGL2 extends Uniform {
  /**
   * 构造函数
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
   * @returns {Object}
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

  /**
   * 通过GL调用更新Uniform
   * @param {WebGL2RenderingContext} gl
   */
  clean(gl) {
    switch(this._type) {
      case UniformType.Float:
        gl.uniform1f(this._location, this._value);
        break;
      case UniformType.FloatMatrix44: 
        gl.uniform4fv(this._location, false, this._value);
        break;
    }
  }
}

export default UniformGL2;

import Uniform from "../../Shaders/Uniform.js";
import ShaderProgramGL2 from "./ShaderProgramGL2.js";

class UniformFloatVector2GL2 extends Uniform{
  /**
   * 构造函数
   * @param {String} name Uniform变量名
   * @param {WebGLUniformLocation} location Uniform变量的位置索引
   * @param {ShaderProgramGL2} observer
   */
  constructor(name, location, observer) {
    super();

    this._name = name;
    this._location = location;
    this._observer = observer;

    this._dirty = false;
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
    return this._value;
  }

  /**
   * 设置Uniform变量的值
   */
  set Value(value) {
    if (!this._dirty && (this._value !== value)) {
      this._dirty = true;
      // 将当前Uniform实例添加到ShaderProgramGL2中的_dirtyUniforms集合，
      // 以等待GL调用进行更新
      this._observer.notifyDirty(this);
    }
    this._value = value;
  }

  /**
   * 通过GL调用更新Uniform
   * @param {WebGL2RenderingContext} gl
   */
  clean(gl) {
    if (this._dirty) {
      gl.uniform2fv(this._location, new Float32Array([this._value.X, this._value.Y]));
      this._dirty = false;
    }
  }
}

export default UniformFloatVector2GL2;
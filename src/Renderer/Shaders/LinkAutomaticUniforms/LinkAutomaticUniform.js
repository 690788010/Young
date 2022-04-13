/**
 * LinkAutomaticUniform类是抽象类，LinkAutomaticUniform只在编译和链接以后设置一次，后面不变。
 */
import Uniform from "../Uniform.js";

class LinkAutomaticUniform {

  /**
   * 抽象方法，获取LinkAutomaticUniform的name属性
   */
  get Name() {}

  /**
   * 抽象方法，为传入的Uniform设置值
   * @param {Uniform} uniform
   */
  set(uniform) {}
}

export default LinkAutomaticUniform;
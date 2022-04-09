/**
 * DrawAutomaticUniformFactory类是一个抽象类，
 * 它是用于生成DrawAutomaticUniform对象的工厂类
 */

import Uniform from "../Uniform.js";
import DrawAutomaticUniform from "./DrawAutomaticUniform.js";

class DrawAutomaticUniformFactory {
  /**
   * 抽象方法，获取name属性
   * @returns {String}
   */
  get Name() {}

  /**
   * 抽象方法，用于创建对应的DrawAutomaticUniform
   * @param {Uniform} unifrom 
   * @returns {DrawAutomaticUniform}
   */
  create(unifrom) {}
}

export default DrawAutomaticUniformFactory;
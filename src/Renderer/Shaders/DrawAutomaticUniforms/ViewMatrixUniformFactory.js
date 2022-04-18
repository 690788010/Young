/**
 * ViewMatrixUniformFactory类是DrawAutomaticUniformFactory类的实现类
 * ViewMatrixUniformFactory类是用于生成ViewMatrixUniform对象的工厂类
 */

import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
import ViewMatrixUniform from "./ViewMatrixUniform.js";

class ViewMatrixUniformFactory extends DrawAutomaticUniformFactory {
  
  /**
   * 获取name属性
   * @returns {String}
   */
  get Name() {
    return "og_viewMatrix";
  }

  /**
   * 生成一个ViewMatrixUniform对象
   * @param {Uniform} uniform 
   * @returns {ViewMatrixUniform} 
   */
   create(uniform) {
    return new ViewMatrixUniform(uniform);
  }
}

export default ViewMatrixUniformFactory;
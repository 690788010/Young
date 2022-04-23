/**
* PerspectiveMatrixUniformFactory类是DrawAutomaticUniformFactory类的实现类
* PerspectiveMatrixUniformFactory类是用于生成PerspectiveMatrixUniform对象的工厂类
*/

import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
import PerspectiveMatrixUniform from "./PerspectiveMatrixUniform.js";

class PerspectiveMatrixUniformFactory extends DrawAutomaticUniformFactory {
  
  /**
   * 获取name属性
   * @returns {String}
   */
  get Name() {
    return "og_perspectiveMatrix";
  }

  /**
   * 生成一个PerspectiveMatrixUniform对象
   * @param {Uniform} uniform 
   * @returns {PerspectiveMatrixUniform} 
   */
   create(uniform) {
    return new PerspectiveMatrixUniform(uniform);
  }
}

export default PerspectiveMatrixUniformFactory;
/**
* ModelViewPerspectiveMatrixUniformFactory类是DrawAutomaticUniformFactory类的实现类
* ModelViewPerspectiveMatrixUniformFactory类是用于生成ModelViewPerspectiveMatrixUniform对象的工厂类
*/

import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
import ModelViewPerspectiveMatrixUniform from "./ModelViewPerspectiveMatrixUniform.js";

class ModelViewPerspectiveMatrixUniformFactory extends DrawAutomaticUniformFactory {
  
  /**
   * 获取name属性
   * @returns {String}
   */
  get Name() {
    return "og_modelViewPerspectiveMatrix";
  }

  /**
   * 生成一个ModelViewPerspectiveMatrixUniform对象
   * @param {Uniform} uniform 
   * @returns {ModelViewPerspectiveMatrixUniform} 
   */
   create(uniform) {
    return new ModelViewPerspectiveMatrixUniform(uniform);
  }
}

export default ModelViewPerspectiveMatrixUniformFactory;
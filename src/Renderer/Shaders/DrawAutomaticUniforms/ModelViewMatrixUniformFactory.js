/**
 * ModelViewMatrixUniformFactory类是DrawAutomaticUniformFactory类的实现类
 * ModelViewMatrixUniformFactory类是用于生成ModelViewMatrixUniform对象的工厂类
 */

import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
import ModelViewMatrixUniform from "./ModelViewMatrixUniform.js";

class ModelViewMatrixUniformFactory extends DrawAutomaticUniformFactory {
  
  /**
   * 获取name属性
   * @returns {String}
   */
   get Name() {
    return "og_modelViewMatrix";
  }

  /**
   * 生成一个ModelViewMatrixUniform对象
   * @param {Uniform} uniform 
   * @returns {ModelViewMatrixUniform} 
   */
   create(uniform) {
    return new ModelViewMatrixUniform(uniform);
  }
}

export default ModelViewMatrixUniformFactory;
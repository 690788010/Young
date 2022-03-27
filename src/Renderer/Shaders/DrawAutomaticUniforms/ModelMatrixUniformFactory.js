/**
 * ModelMatrixUniformFactory类是DrawAutomaticUniformFactory类的实现类
 * ModelMatrixUniformFactory类是用于生成ModelMatrixUniform对象的工厂类
 */

import Uniform from "../Uniform";
import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory";
import ModelMatrixUniform from "./ModelMatrixUniform";

class ModelMatrixUniformFactory extends DrawAutomaticUniformFactory {
  get Name() {
    return "og_modelMatrix";
  }

  /**
   * 生成一个ModelMatrixUniform对象
   * @param {Uniform} uniform 
   * @returns {ModelMatrixUniform} 
   */
  create(uniform) {
    return new ModelMatrixUniform(uniform);
  }
}

export default ModelMatrixUniformFactory;
/**
* LightPropertiesUniformFactory类是DrawAutomaticUniformFactory类的实现类
* LightPropertiesUniformFactory类是用于生成LightPropertiesUniform对象的工厂类
*/

import Uniform from "../Uniform.js";
import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
import LightPropertiesUniform from "./LightPropertiesUniform.js";

class LightPropertiesUniformFactory extends DrawAutomaticUniformFactory {

  /**
   * 获取name属性
   * @returns {String}
   */
  get Name() {
    return "og_diffuseSpecularAmbientShininess";
  }

  /**
   * 生成一个LightPropertiesUniform对象
   * @param {Uniform} uniform 
   * @returns {LightPropertiesUniform} 
   */
  create(uniform) {
    return new LightPropertiesUniform(uniform);
  }
}

export default LightPropertiesUniformFactory;
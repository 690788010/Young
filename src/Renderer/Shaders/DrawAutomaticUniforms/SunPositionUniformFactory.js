/**
* SunPositionUniformFactory类是DrawAutomaticUniformFactory类的实现类
* SunPositionUniformFactory类是用于生成SunPositionUniform对象的工厂类
*/

import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
import SunPositionUniform from "./SunPositionUniform.js";

class SunPositionUniformFactory extends DrawAutomaticUniformFactory {
  
  /**
   * 获取name属性
   * @returns {String}
   */
  get Name() {
    return "og_sunPosition";
  }

  /**
   * 生成一个ViewMatrixUniform对象
   * @param {Uniform} uniform 
   * @returns {SunPositionUniform} 
   */
   create(uniform) {
    return new SunPositionUniform(uniform);
  }
}

export default SunPositionUniformFactory;
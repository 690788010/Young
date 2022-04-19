
/**
* CameraEyeUniformFactory类是DrawAutomaticUniformFactory类的实现类
* CameraEyeUniformFactory类是用于生成CameraEyeUniform对象的工厂类
*/

import Uniform from "../Uniform.js";
import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
import CameraEyeUniform from "./CameraEyeUniform.js";

class CameraEyeUniformFactory extends DrawAutomaticUniformFactory {

  /**
   * 获取name属性
   * @returns {String}
   */
  get Name() {
    return "og_cameraEye";
  }

  /**
   * 生成一个ModelMatrixUniform对象
   * @param {Uniform} uniform 
   * @returns {CameraEyeUniform} 
   */
  create(uniform) {
    return new CameraEyeUniform(uniform);
  }
}

export default CameraEyeUniformFactory;
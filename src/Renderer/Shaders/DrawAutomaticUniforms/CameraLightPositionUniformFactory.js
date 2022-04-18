/**
 * CameraLightPositionUniformFactory类是DrawAutomaticUniformFactory类的实现类
 * CameraLightPositionUniformFactory类是用于生成CameraLightPositionUniform对象的工厂类
 */

 import Uniform from "../Uniform.js";
 import DrawAutomaticUniformFactory from "./DrawAutomaticUniformFactory.js";
 import CameraLightPositionUniform from "./CameraLightPositionUniform.js";
 
 class CameraLightPositionUniformFactory extends DrawAutomaticUniformFactory {
 
   /**
    * 获取name属性
    * @returns {String}
    */
   get Name() {
     return "og_cameraLightPosition";
   }
 
   /**
    * 生成一个ModelMatrixUniform对象
    * @param {Uniform} uniform 
    * @returns {CameraLightPositionUniform} 
    */
   create(uniform) {
     return new CameraLightPositionUniform(uniform);
   }
 }
 
 export default CameraLightPositionUniformFactory;
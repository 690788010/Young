/**
 * 用于创建各个渲染对象的工厂类
 */

import GraphicsWindowGL2 from "./GL2/GraphicsWindowGL2.js";
import LinkAutomaticUniformCollection from "./Shaders/LinkAutomaticUniforms/LinkAutomaticUniformCollection.js"
import GraphicsWindow from "./GraphicsWindow.js";
import TextureUniform from "./Shaders/LinkAutomaticUniforms/TextureUniform.js";
import DrawAutomaticUniformFactoryCollection from "./Shaders/DrawAutomaticUniforms/DrawAutomaticUniformFactoryCollection.js";
import ModelMatrixUniformFactory from "./Shaders/DrawAutomaticUniforms/ModelMatrixUniformFactory.js";
import ViewMatrixUniformFactory from "./Shaders/DrawAutomaticUniforms/ViewMatrixUniformFactory.js";
import ModelViewMatrixUniformFactory from "./Shaders/DrawAutomaticUniforms/ModelViewMatrixUniformFactory.js";
import CameraLightPositionUniformFactory from "./Shaders/DrawAutomaticUniforms/CameraLightPositionUniformFactory.js";
import CameraEyeUniformFactory from "./Shaders/DrawAutomaticUniforms/CameraEyeUniformFactory.js";


const GL = document.createElement("canvas").getContext("webgl2");

// LinkAutomaticUniform只在编译和链接时设置一次，后面不变。
// Device类保存了一个LinkAutoMaticUniform集合（LinkAutoMaticUniform已初始化值），在着色器编译、链接以后，
// ShaderProgram类就调用_initializeAutomaticUniforms方法遍历着色器的Uniforms，从而使
// 用Device类的LinkAutoMaticUniform集合中对应的LinkAutoMaticUniform的值为对应的Uniform（以"og_"开头）设置值。
const LinkAutomaticUniforms = new LinkAutomaticUniformCollection();
const numberOfTextureUnits = GL.getParameter(GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
for (let i = 0; i < numberOfTextureUnits; i++) {
  LinkAutomaticUniforms.add(new TextureUniform(i));
}

// 保存DrawAutomaticUniformFactory的集合，ShaderProgram类会使用该集合创建对应的DrawAutomaticUniform并保存
const DrawAutomaticUniformFactories = new DrawAutomaticUniformFactoryCollection();
DrawAutomaticUniformFactories.add(new ModelMatrixUniformFactory());
DrawAutomaticUniformFactories.add(new ViewMatrixUniformFactory());
DrawAutomaticUniformFactories.add(new ModelViewMatrixUniformFactory());
DrawAutomaticUniformFactories.add(new CameraLightPositionUniformFactory());
DrawAutomaticUniformFactories.add(new CameraEyeUniformFactory());

class Device {
  
  /**
   * 创建一个GraphicsWindow对象
   * @param {String} containerId 容器元素的ID
   * @returns {GraphicsWindow} 
   */
  static CreateWindow(containerId) {
    return new GraphicsWindowGL2(containerId);
  }

  /**
   * WeblGL支持的顶点着色器attribute属性的最大数量
   * @returns {GLint}
   */
  static get MAX_VERTEX_ATTRIBS() {
    return GL.getParameter(GL.MAX_VERTEX_ATTRIBS);
  }

  /**
   * WebGL支持的所有着色器阶段可以使用的纹理单元总数
   * @returns {GLint}
   */
  static get MAX_COMBINED_TEXTURE_IMAGE_UNITS() {
    return GL.getParameter(GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  }

  /**
   * 获取WebGL的纹理单元0的数字编号
   * @returns {GLenum}
   */
  static get TEXTURE0() {
    return GL.TEXTURE0;
  }

  /**
   * 获取LinkAutomaticUniform的集合
   * @returns {LinkAutomaticUniformCollection}
   */
  static get LinkAutomaticUniforms() {
    return LinkAutomaticUniforms;
  }

  /**
   * 获取DrawAutomaticUniformFactory的集合
   * @returns {DrawAutomaticUniformFactoryCollection}
   */
  static get DrawAutomaticUniformFactories() {
    return DrawAutomaticUniformFactories;
  }

  /**
   * 将加载了图片的Image对象转换为Typed Array
   * @param {Image} image 
   * @returns {Typed Array}
   */
  static ImageToTypedArray(image) {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = image.width;
    canvasEle.height = image.height;
    const canvas2D = canvasEle.getContext("2d");
    canvas2D.drawImage(image, 0, 0);
    const imageData = canvas2D.getImageData(0, 0, image.width, image.height);
    return imageData.data;
  }
}

export default Device;

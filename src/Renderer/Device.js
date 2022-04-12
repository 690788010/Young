/**
 * 用于创建各个渲染对象的工厂类
 */

import GraphicsWindowGL2 from "./GL2/GraphicsWindowGL2.js";
import ShaderProgram from "./Shaders/ShaderProgram.js";
import ShaderProgramGL2 from "./GL2/Shaders/ShaderProgramGL2.js";
import VertexBufferGL2 from "./GL2/Buffers/VertexBufferGL2.js";
import IndexBufferGL2 from "./GL2/Buffers/IndexBufferGL2.js";
import LinkAutomaticUniformCollection from "./Shaders/LinkAutomaticUniforms/LinkAutomaticUniformCollection.js"
import GraphicsWindow from "./GraphicsWindow.js";
import TextureUniform from "./Shaders/LinkAutomaticUniforms/TextureUniform.js";
import DrawAutomaticUniformFactoryCollection from "./Shaders/DrawAutomaticUniforms/DrawAutomaticUniformFactoryCollection.js";
import ModelMatrixUniformFactory from "./Shaders/DrawAutomaticUniforms/ModelMatrixUniformFactory.js";
import Mesh from "../Core/Geometry/Mesh.js";
import ShaderVertexAttributeCollection from "./ShaderVertexAttributeCollection.js";
import BufferHint from "./Buffers/BufferHint.js";
import MeshBuffers from "./Mesh/MeshBuffers.js";
import IndicesType from "../Core/Geometry/Indices/IndicesType.js";
import VertexAttributeType from "../Core/Geometry/VertexAttributes/VertexAttributeType.js";
import VertexBufferAttributeGL2 from "./GL2/VertexArray/VertexBufferAttributeGL2.js";
import ComponentDatatype from "./VertexArray/ComponentDatatype.js";
import VertexBuffer from "./Buffers/VertexBuffer.js";


const commonGL = document.createElement("canvas").getContext("webgl2");

// LinkAutomaticUniform只在编译和链接时设置一次，后面不变
// Device类保存了一个LinkAutoMaticUniform集合（LinkAutoMaticUniform已包含值），在着色器编译、链接以后，
// ShaderProgram类就调用_initializeAutomaticUniforms方法遍历着色器的Uniforms，
// 使用Device类的LinkAutoMaticUniform集合中对应的LinkAutoMaticUniform的值为对应的Uniform（以"og_"开头）设置值。
const s_linkAutomaticUniforms = new LinkAutomaticUniformCollection();

// 保存DrawAutomaticUniformFactory的集合，ShaderProgram类会使用该集合初始化DrawAutomaticUniform
const s_drawAutomaticUniformFactories = new DrawAutomaticUniformFactoryCollection();
s_drawAutomaticUniformFactories.add(new ModelMatrixUniformFactory());

class Device {
  
  /**
   * 创建一个GraphicsWindow对象
   * @param {String} containerId 容器元素的ID
   * @returns {GraphicsWindow} 
   */
  static CreateWindow(containerId) {
    return new GraphicsWindowGL2(containerId);
  }

  // /**
  //  * 创建一个ShaderProgram对象
  //  * @param  {String} vertexShaderSource
  //  * @param  {String} fragmentShaderSource
  //  * @returns {ShaderProgram}
  //  */
  // static CreateShaderProgram(vertexShaderSource, fragmentShaderSource) {
  //   return new ShaderProgramGL2(commonGL, vertexShaderSource, fragmentShaderSource);
  // }

  /**
   * 获取着色器程序中已声明的顶点属性的数量
   * @returns {Number}
   */
  static get MaximumNumberOfVertexAttributes() {
    return commonGL.getParameter(commonGL.MAX_VERTEX_ATTRIBS);
  }

  /**
   * 获取可以使用的纹理单元的数量
   * @returns {Number}
   */
  static get NumberOfTextureUnits() {
    return commonGL.getParameter(commonGL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  }

  /**
   * 获取LinkAutomaticUniform的集合
   * @returns {LinkAutomaticUniformCollection}
   */
  static get LinkAutomaticUniforms() {
    return s_linkAutomaticUniforms;
  }

  /**
   * 获取DrawAutomaticUniformFactory的集合
   * @returns {DrawAutomaticUniformFactoryCollection}
   */
  static get DrawAutomaticUniformFactories() {
    return s_drawAutomaticUniformFactories;
  }

  /**
   * 获取GL支持的最大顶点attribute属性的数量
   * @returns {Number}
   */
  static get MaximumNumberOfVertexAttributes() {
    return commonGL.getParameter(commonGL.MAX_VERTEX_ATTRIBS);
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

// 初始化LinkAutomaticUniformCollection中各个LinkAutomaticUniform的值
const numberOfTextureUnits = Device.NumberOfTextureUnits;
for (let i = 0; i < numberOfTextureUnits; i++) {
  s_linkAutomaticUniforms.add(new TextureUniform(i));
}

export default Device;

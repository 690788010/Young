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
import DrawAutomaticUniformFactory from "./Shaders/DrawAutomaticUniforms/DrawAutomaticUniformFactory.js";

const commonGL = document.createElement("canvas").getContext("webgl2");

// LinkAutomaticUniform只在编译和链接时设置一次，后面不变
const s_linkAutomaticUniforms = new LinkAutomaticUniformCollection();

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

  /**
   * 创建一个ShaderProgram对象
   * @param  {String} vertexShaderSource
   * @param  {String} fragmentShaderSource
   * @returns {ShaderProgram}
   */
  static CreateShaderProgram(vertexShaderSource, fragmentShaderSource) {
    return new ShaderProgramGL2(commonGL, vertexShaderSource, fragmentShaderSource);
  }

  /**
   * 创建一个VertexBufferGL2对象
   * @param  {String} usageHint
   * @param  {Number} sizeInBytes
   * @returns {VertexBufferGL2}
   */
  static CreateVertexBuffer(usageHint, sizeInBytes) {
    return new VertexBufferGL2(usageHint, sizeInBytes);
  }

  /**
   * 创建一个VertexBufferGL2对象
   * @param  {String} usageHint
   * @param  {Number} sizeInBytes
   * @returns {IndexBufferGL2}
   */
  static CreateIndexBuffer(usageHint, sizeInBytes) {
    return new IndexBufferGL2(usageHint, sizeInBytes);
  }

  static CreateTexture2D(description) {
    return new Texture2DGL3x(description, TextureTarget.Texture2D);
  }

  /**
   * 获取可以使用的顶点属性的最大数量
   * @returns {Number}
   */
  static MaximumNumberOfVertexAttributes() {
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
   * @returns {DrawAutomaticUniformFactory}
   */
  static get DrawAutomaticUniformFactories() {
    return s_drawAutomaticUniformFactories;
  }
}

// 初始化LinkAutomaticUniformCollection
const numberOfTextureUnits = Device.NumberOfTextureUnits;
for (let i = 0; i < numberOfTextureUnits; i++) {
  s_linkAutomaticUniforms.add(new TextureUniform(i));
}

export default Device;

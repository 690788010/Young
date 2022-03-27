/**
 * 用于创建各个渲染对象的工厂类
 */

import GraphicsWindowGL2 from "./GL2/GraphicsWindowGL2.js";
import ShaderProgram from "./Shaders/ShaderProgram.js";
import ShaderProgramGL2 from "./GL2/Shaders/ShaderProgramGL2.js";
import VertexBufferGL2 from "./GL2/Buffers/VertexBufferGL2.js";
import IndexBufferGL2 from "./GL2/Buffers/IndexBufferGL2.js";

const commonGL = document.createElement("canvas").getContext("webgl2");

class Device {
  
  /**
   * 创建一个GraphicsWindow对象
   * @param {String} containerId 容器元素的ID
   * @param {String} title 窗口的标题 
   * @returns 
   */
  static CreateWindow(containerId, title = "") {
    return new GraphicsWindowGL2(containerId, title);
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
  static NumberOfTextureUnits() {
    return commonGL.getParameter(commonGL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  }
}

export default Device;

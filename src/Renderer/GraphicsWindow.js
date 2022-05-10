/**
 * GraphicsWindow类是表示窗口画布的一个抽象类
 */

import Context from "./Context.js";
import ShaderProgram from "./Shaders/ShaderProgram.js";
import VertexBuffer from "./Buffers/VertexBuffer.js";
import IndexBuffer from "./Buffers/IndexBuffer.js";
import WritePixelBuffer from "./Buffers/WritePixelBuffer.js";
import Texture2D from "./Textures/Texture2D.js";
import TextureSampler from "./Textures/TextureSampler.js";

class GraphicsWindow {
  
  /**
   * 抽象方法
   * @returns {Context}
   */
  get Context() {}

  /**
  * 抽象方法，创建一个ShaderProgramGL对象
  * @param  {String} vertexShaderSource 顶点着色器
  * @param  {String} fragmentShaderSource 片元着色器
  * @returns {ShaderProgram}
  */
  createShaderProgram(vertexShaderSource, fragmentShaderSource) {}

  /**
  * 抽象方法，创建一个VertexBuffer对象
  * @param  {BufferHint} usageHint
  * @param  {Number} sizeInBytes
  * @returns {VertexBuffer}
  */
  createVertexBuffer(usageHint, sizeInBytes) {}

  /**
  * 抽象方法，创建一个VertexBuffer对象
  * @param  {BufferHint} usageHint
  * @param  {Number} sizeInBytes
  * @returns {IndexBuffer}
  */
  createIndexBuffer(usageHint, sizeInBytes) {}

  /**
  * 抽象方法，创建WritePixelBuffer对象
  * @param {PixelBufferHint} usageHint
  * @param {Number} sizeInBytes
  * @returns {WritePixelBuffer}
  */
  createWritePixelBuffer(usageHint, sizeInBytes) {}

  /**
  * 抽象方法，创建Texture2D对象
  * @param {Texture2DDescription} description 
  * @returns {Texture2D}
  */
  createTexture2D(description) {}

  /**
  * 抽象方法，创建TextureSampler对象
  * @param {TextureMinificationFilter} minificationFilter 
  * @param {TextureMagnificationFilter} magnificationFilter 
  * @param {TextureWrap} wrapS 
  * @param {TextureWrap} WrapT 
  * @param {Number} maximumAnistropy
  * @returns {TextureSampler}
  */
  createTexture2DSampler(minificationFilter, magnificationFilter, 
    wrapS, WrapT, maximumAnistropy) {}

  /**
   * 渲染一帧
   */
  renderFrame() {
    this.onPreRender();
    this.onRender();
    this.onPostRender();
  }

  /**
   * 抽象方法
   */
  onPreRender() {}

  /**
   * 抽象方法
   */
  onRender() {}

  /**
   * 抽象方法
   */
  onPostRender() {}

  init() {

  }

  /**
   * 循环渲染
   */
  loopRender() {
    this.renderFrame();
    window.requestAnimationFrame(() => {
      this.loopRender();
    });
  }

  /**
   * 开始运行系统
   */
  run() {
    this.init();      // 做一些初始操作
    this.loopRender();    // 开始循环渲染
  }
}

export default GraphicsWindow;
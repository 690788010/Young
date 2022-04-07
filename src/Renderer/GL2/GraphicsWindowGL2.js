/**
 * GraphicsWindowGL2类是GraphicsWindow抽象类的关于WebGL2的实现类
 * GraphicsWindow类是表示窗口画布的一个抽象类，该类也用于创建Context类对象
 */

import GraphicsWindow from "../GraphicsWindow.js";
import ContextGL2 from "./ContextGL2.js";
import ShaderProgramGL2 from "./Shaders/ShaderProgramGL2.js";


class GraphicsWindowGL2 extends GraphicsWindow {
  /**
   * 构造函数
   * @param {String} containerId 容器元素的ID
   */
  constructor(containerId) {
    super();

    const containerDiv = document.getElementById(containerId);
    // 保证容器元素是DIV元素
    if (containerDiv.nodeName !== "DIV") {
      throw new Error("Container element must be Div!");
    }
    // 创建一个canvas元素（与容器元素大小一样）放入容器元素中
    const canvas = document.createElement("canvas");
    const width = containerDiv.clientWidth;
    const height = containerDiv.clientHeight;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    containerDiv.appendChild(canvas);
    // 获取WebGL2的环境对象（WebGL2RenderingContext）
    this._gl = canvas.getContext("webgl2");
    
    // 初始化内置的ContextGL2对象
    this._context = new ContextGL2(this._gl, width, height);
  }

  /**
   * 创建一个ShaderProgram对象
   * @param  {String} vertexShaderSource
   * @param  {String} fragmentShaderSource
   * @returns {ShaderProgram}
   */
  createShaderProgram(vertexShaderSource, fragmentShaderSource) {
    return new ShaderProgramGL2(this._gl, vertexShaderSource, fragmentShaderSource);
  }

  /**
   * 获取内置的ContextGL对象
   * @returns {ContextGL2} 
   */
  get Context() {
    return this._context;
  }
}

export default GraphicsWindowGL2;

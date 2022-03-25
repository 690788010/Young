/**
 * GraphicsWindowGL2类是GraphicsWindow抽象类的关于WebGL2的实现类
 * GraphicsWindow类是表示窗口画布的一个抽象类，该类也用于创建Context类对象
 */

import GraphicsWindow from "../GraphicsWindow.js";
import ContextGL2 from "./ContextGL2.js";


class GraphicsWindowGL2 extends GraphicsWindow {
  constructor(containerId, title) {
    super();

    const containerDiv = document.getElementById(containerId);
    // 保证容器元素是DIV元素
    if (containerDiv.nodeName !== "DIV") {
      throw new Error("Container element must be Div!");
    }
    // 创建一个canvas元素放入容器元素中
    const canvas = document.createElement("canvas");
    const width = containerDiv.clientWidth;
    const height = containerDiv.clientHeight;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    containerDiv.appendChild(canvas);
    // 获取WebGL2的环境对象（WebGL2RenderingContext）
    const gl = canvas.getContext("webgl2");
    
    // 初始化内置的ContextGL2对象
    this._context = new ContextGL2(gl, width, height);
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

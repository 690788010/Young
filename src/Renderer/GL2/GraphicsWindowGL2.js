/**
 * GraphicsWindowGL2类是GraphicsWindow抽象类的关于WebGL2的实现类
 */

import GraphicsWindow from "../GraphicsWindow.js";

class GraphicsWindowGL2 extends GraphicsWindow {
  constructor(containerId, title, windowType) {
    super();
    const containerDiv = document.getElementById(containerId);
    // 保证容器元素是DIV元素
    if (containerDiv.nodeName !== "DIV") {
      throw new Error("Container element must be Div!");
    }
    // 创建一个canvas元素放入容器元素中
    const canvas = document.createElement("canvas");
    canvas.style.width = containerDiv.clientWidth + "px";
    canvas.style.height = containerDiv.clientHeight + "px";
    containerDiv.appendChild(canvas);
    // 获取WebGL2的环境对象（WebGL2RenderingContext）
    const gl = canvas.getContext("webgl2");
    console.log(gl);
    // 初始化内置的ContextGL2对象
    // this._context = new ContextGL2(_gameWindow, width, height);
  }
}

export default GraphicsWindowGL2;

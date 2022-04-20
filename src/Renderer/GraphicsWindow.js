/**
 * GraphicsWindow类是表示窗口画布的一个抽象类
 */

import Context from "./Context.js";

class GraphicsWindow {
  
  /**
   * 抽象方法
   * @returns {Context}
   */
  get Context() {}

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
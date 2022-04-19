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

  /**
   * 开始运行系统
   */
  run() {
    // console.log(1111)
    this.renderFrame();
    window.requestAnimationFrame(() => {
      this.run();
    });
  }
}

export default GraphicsWindow;
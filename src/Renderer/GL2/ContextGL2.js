/**
 * ContextGL2类
 */

import Context from "../Context.js";
import RenderState from "../RenderState/RenderState.js";
import ViewPort from "../ViewPort.js";
import TextureUnitsGL2 from "./Textures/TextureUnitsGL2.js";

class ContextGL2 extends Context {
  constructor(gl, width, height) {
    super();

    this._renderState = new RenderState(gl);    // 初始化渲染状态
    this._textureUnits = new TextureUnitsGL2(gl);   // 初始化纹理单元

    // 设置视口大小
    this._viewPort = new ViewPort(0, 0, width, height);
    this.updateViewPort(gl);
  }

  /**
   * 更新视口。
   * @param {WebGL2RenderingContext} gl webgl2环境对象 
   */
  updateViewPort(gl, width, height) {
    gl.viewport(this._viewPort.X, this._viewPort.Y,
      this._viewPort.Width, this._viewPort.Height);
  }

  /**
   * 获取视口信息
   * @returns {ViewPort}
   */
  get ViewPort() {
    return this._viewPort;
  }
}

export default ContextGL2;
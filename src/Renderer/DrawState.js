/**
 * DrawState类是一个抽象类，用于包含绘制的状态
 */
import RenderState from "./RenderState/RenderState.js"

class DrawState {
  constructor(renderState, shaderProgram, vertexArray) {
    this._renderState = renderState;
    this._shaderProgram = shaderProgram;
    this._vertexArray = vertexArray;
  }

  /**
   * 返回RenderState对象
   * @returns {RenderState}
   */
  get RenderState() {
    return this._renderState;
  }

  /**
   * 设置RenderState对象
   * @param {RenderState}
   */
  set RenderState(renderState) {
    this._renderState = renderState;
  }
}

export default DrawState;
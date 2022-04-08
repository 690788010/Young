/**
 * DrawState类相当于一个容器，包含了RenderState、ShaderProgram
 * 和VertexArray.
 */
import RenderState from "./RenderState/RenderState.js"
import ShaderProgram from "./Shaders/ShaderProgram.js"
import VertexArray from "./VertexArray/VertexArray.js";

class DrawState {
  /**
   * 构造函数
   * @param {RenderState} renderState 
   * @param {ShaderProgram} shaderProgram 
   * @param {VertexArray} vertexArray 
   */
  constructor(renderState, shaderProgram, vertexArray) {
    this._renderState = renderState;
    this._shaderProgram = shaderProgram;
    this._vertexArray = vertexArray;
  }

  /**
   * @returns {RenderState}
   */
  get RenderState() {
    return this._renderState;
  }

  /**
   * @param {RenderState} value
   */
  set RenderState(value) {
    this._renderState = value;
  }

  /**
   * @returns {ShaderProgram}
   */
  get ShaderProgram() {
    return this._shaderProgram;
  }

  /**
   * @param {ShaderProgram} value
   */
  set ShaderProgram(value) {
    this._shaderProgram = value;
  }

  /**
   * @returns {VertexArray}
   */
  get VertexArray() {
    return this._vertexArray;
  }

  /**
   * @param {VertexArray} value
   */
  set VertexArray(value) {
    this._vertexArray = value;
  }
}

export default DrawState;
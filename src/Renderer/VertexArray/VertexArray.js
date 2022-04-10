/**
 * VertexArray类是一个抽象类，它用于表示顶点数组
 */
import Disposable from "../../Core/Disposable.js";
import VertexBufferAttributes from "./VertexBufferAttributes.js";
import IndexBuffer from "../Buffers/IndexBuffer.js";

class VertexArray extends Disposable {

  /**
   * 抽象方法
   * @returns {VertexBufferAttributes}
   */
  get Attributes() {}

  /**
   * 抽象方法
   * @returns {IndexBuffer}
   */
  get IndexBuffer() {}

  /**
   * 设置索引缓冲
   * @param {IndexBuffer} value
   */
  set IndexBuffer(value) {}

  /**
   * 
   * @returns {Boolean}
   */
  get DisposeBuffers() {
    return this._disposeBuffers;
  }

  /**
   * @param {Boolean} value
   */
  set DisposeBuffers(value) {
    this._disposeBuffers = value;
  }

  /**
   * 抽象方法，删除VAO
   */
  dispose() {}
}

export default VertexArray;
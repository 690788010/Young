/**
 * VertexArray类是一个抽象类，它用于表示顶点数组
 */
import Disposable from "../../Core/Disposable.js";

class VertexArray extends Disposable {

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
}

export default VertexArray;
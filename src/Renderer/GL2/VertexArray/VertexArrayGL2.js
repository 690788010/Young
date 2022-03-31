/**
 * VertexArrayGL2类是VertexArray抽象类基于WebGL2的实现类
 * VertexArray类是一个抽象类，它用于表示顶点数组
 */

import VertexArray from "../../VertexArray/VertexArray.js";
import VertexArrayNameGL2 from "../Names/VertexArrayNameGL2.js";
import VertexBufferAttributesGL2 from "./VertexBufferAttributesGL2.js";
import IndexBuffer from "../../Buffers/IndexBuffer.js"

class VertexArrayGL2 extends VertexArray {
  /**
   * 
   * @param {WebGL2RenderingContext} gl WebGL2的环境对象
   */
  constructor(gl) {
    super();

    this._gl = gl;
    this._name = new VertexArrayNameGL2(this._gl);
    this._attributes = new VertexBufferAttributesGL2();
    this._indexBuffer = null;
  }

  /**
   * 绑定VAO
   */
  bind() {
    this._gl.bindVertexArray(this._name.Value);
  }

  get Attributes() {
    return this._attributes;
  }

  get IndexBuffer() {
    return this._indexBuffer;
  }

  /**
   * 设置索引缓冲
   * @param {IndexBuffer} value
   */
  set IndexBuffer(value) {
    this._indexBuffer = value;
  }

  maximumArrayIndex() {
    return this._attributes.MaximumArrayIndex();
  }
}

export default VertexArrayGL2;
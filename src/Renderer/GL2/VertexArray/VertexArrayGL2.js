/**
 * VertexArrayGL2类是VertexArray抽象类基于WebGL2的实现类
 * VertexArray类是一个抽象类，它用于表示顶点数组
 */

import VertexArray from "../../VertexArray/VertexArray.js";
import VertexArrayNameGL2 from "../Names/VertexArrayNameGL2.js";
import VertexBufferAttributesGL2 from "./VertexBufferAttributesGL2.js";
import IndexBuffer from "../../Buffers/IndexBuffer.js"
import VertexBufferAttributes from "../../VertexArray/VertexBufferAttributes.js";

class VertexArrayGL2 extends VertexArray {
  /**
   * 
   * @param {WebGL2RenderingContext} gl WebGL2的环境对象
   */
  constructor(gl) {
    super();

    this._gl = gl;
    this._name = new VertexArrayNameGL2(this._gl);
    this._attributes = new VertexBufferAttributesGL2(this._gl);
    this._indexBuffer = null;
    this._dirtyIndexBuffer = false;
  }

  /**
   * 绑定VAO
   */
  bind() {
    this._gl.bindVertexArray(this._name.Value);
  }

  /**
   * 完成更新操作
   */
  clean() {
    // 为被更新的VertexBufferAttribute通过GL调用进行更新同步
    this._attributes.clean();   
    if (this._dirtyIndexBuffer) {
      if (this._indexBuffer) {
        this._indexBuffer.bind();
      }
      this._dirtyIndexBuffer = false;
    }
  }

  /**
   * @returns {VertexBufferAttributes}
   */
  get Attributes() {
    return this._attributes;
  }

  /**
   * @returns {IndexBuffer}
   */
  get IndexBuffer() {
    return this._indexBuffer;
  }

  /**
   * 设置索引缓冲
   * @param {IndexBuffer} value
   */
  set IndexBuffer(value) {
    this._indexBuffer = value;
    this._dirtyIndexBuffer = true;    // 标识有新的未使用的索引缓存
  }

  maximumArrayIndex() {
    return this._attributes.MaximumArrayIndex();
  }

  /**
   * 删除VAO
   */
  dispose() {
    this._name.dispose();
  }
}

export default VertexArrayGL2;
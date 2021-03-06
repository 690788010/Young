/**
 * VertexBufferAttributesGL2类是VertexBufferAttributes抽象类的基于WebGL的实现类
 * VertexBufferAttributes类是一个抽象类，它用于包含多个VertexBufferAttribute对象
*/

import ComponentDatatype from "../../VertexArray/ComponentDatatype.js";
import VertexBufferAttribute from "../../VertexArray/VertexBufferAttribute.js";
import VertexBufferAttributes from "../../VertexArray/VertexBufferAttributes.js";
import TypeConverterGL2 from "../TypeConverterGL2.js";
import Device from "../../Device.js"

class VertexBufferAttributesGL2 extends VertexBufferAttributes {
  constructor(gl) {
    super();
    this._gl = gl;

    // 存放多个VertexBufferAttribute
    this._attributes = new Array(Device.MAX_VERTEX_ATTRIBS);

    // _attributes中包含的有效VertexBufferAttributeGL2的数量
    this._count = 0;

    // 标识_attributes中是否包含具有新值的未使用的VertexBufferAttributeGL2元素
    this._dirty = false;
  }

  /**
   * 获取_attributes中包含的有效VertexBufferAttribute的数量
   * @returns {Number}
   */
  get Count() {
    return this._count;
  }

  /**
   * @param {Number} index 
   * @returns {VertexBufferAttribute}
   */
  get(index) {
    return this._attributes[index];
  }
  
  /**
   * 对特定索引的VertexBufferAttribute进行更新
   * @param {Number} index 
   * @param {VertexBufferAttribute} value 
   */
  set(index, value) {
    if ((this._attributes[index] !== value) || (this._attributes[index] && !(this._attributes[index].equals(value)))) {
      if (value !== null && value !== undefined) {
        if (value.NumberOfComponents < 1 || value.NumberOfComponents > 4) {
          throw new Error("NumberOfComponents must be between one and four.");
        }
        if (value.Normalize) {
          if ((value.ComponentDatatype !== ComponentDatatype.Byte) &&
              (value.ComponentDatatype !== ComponentDatatype.UnsignedByte) &&
              (value.ComponentDatatype !== ComponentDatatype.Short) &&
              (value.ComponentDatatype !== ComponentDatatype.UnsignedShort) &&
              (value.ComponentDatatype !== ComponentDatatype.Int) &&
              (value.ComponentDatatype !== ComponentDatatype.UnsignedInt)) 
          {
            throw new Error("When Normalize is true, ComponentDatatype must be Byte, UnsignedByte, Short, UnsignedShort, Int, or UnsignedInt.");
          }
        }
        if (!this._attributes[index]) {
          this._count++;
        }
      } else {
        if (this._attributes[index]) {
          this._count--;
        }
      }
      this._attributes[index] = value;
      this._attributes[index].Dirty = true;
      this._dirty = true;
    }
  }

  /**
   * 为被更新的VertexBufferAttribute通过GL调用进行更新同步
   */
  clean() {
    if (this._dirty) {
      for (let i = 0, len = this._attributes.length; i < len; i++) {
        const attribute = this._attributes[i];
        if (attribute) {
          if (attribute.Dirty) {
            this._attach(i);
            attribute.Dirty = false;
          }
        } else if (attribute === null) {
          this._detach(i);
        }
      }
      this._dirty = false;
    }
  }

  /**
   * 为特定索引的VertexBufferAttribute通过GL调用进行更新
   * @param {Number} index 
   */
  _attach(index) {
    const attribute = this._attributes[index];
    const vertexBuffer = attribute.VertexBuffer;
    vertexBuffer.bind(); // 绑定顶点缓冲区
    
    // 告诉GL从当前绑定的顶点缓冲区如何读取数据
    this._gl.vertexAttribPointer(index, attribute.NumberOfComponents,
      TypeConverterGL2.ComponentDataTypeTo(attribute.ComponentDatatype),
      attribute.Normalize, attribute.StrideInBytes, attribute.OffsetInBytes);
    this._gl.enableVertexAttribArray(index);
  }

  /**
   * 通过GL调用对特定的attribute属性进行关闭
   * @param {Number} index 
   */
  _detach(index) {
    this._gl.disableVertexAttribArray(index);
  }
}

export default VertexBufferAttributesGL2;
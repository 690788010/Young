/**
 * 用于创建各个渲染对象的工厂类
 */

import GraphicsWindowGL2 from "./GL2/GraphicsWindowGL2.js";
import ShaderProgram from "./Shaders/ShaderProgram.js";
import ShaderProgramGL2 from "./GL2/Shaders/ShaderProgramGL2.js";
import VertexBufferGL2 from "./GL2/Buffers/VertexBufferGL2.js";
import IndexBufferGL2 from "./GL2/Buffers/IndexBufferGL2.js";
import LinkAutomaticUniformCollection from "./Shaders/LinkAutomaticUniforms/LinkAutomaticUniformCollection.js"
import GraphicsWindow from "./GraphicsWindow.js";
import TextureUniform from "./Shaders/LinkAutomaticUniforms/TextureUniform.js";
import DrawAutomaticUniformFactoryCollection from "./Shaders/DrawAutomaticUniforms/DrawAutomaticUniformFactoryCollection.js";
import ModelMatrixUniformFactory from "./Shaders/DrawAutomaticUniforms/ModelMatrixUniformFactory.js";
import DrawAutomaticUniformFactory from "./Shaders/DrawAutomaticUniforms/DrawAutomaticUniformFactory.js";
import Mesh from "../Core/Geometry/Mesh.js";
import ShaderVertexAttributeCollection from "./ShaderVertexAttributeCollection.js";
import BufferHint from "./Buffers/BufferHint.js";
import MeshBuffers from "./Mesh/MeshBuffers.js";
import IndicesType from "../Core/Geometry/Indices/IndicesType.js";
import VertexAttributeType from "../Core/Geometry/VertexAttributes/VertexAttributeType.js";
import VertexBufferAttributeGL2 from "./GL2/VertexArray/VertexBufferAttributeGL2.js";
import ComponentDatatype from "./VertexArray/ComponentDatatype.js";


const commonGL = document.createElement("canvas").getContext("webgl2");

// LinkAutomaticUniform只在编译和链接时设置一次，后面不变
// Device类保存了一个LinkAutoMaticUniform集合（LinkAutoMaticUniform已包含值），在着色器编译、链接以后，
// ShaderProgram类就调用_initializeAutomaticUniforms方法遍历着色器的Uniforms，
// 使用Device类的LinkAutoMaticUniform集合中对应的LinkAutoMaticUniform的值为对应的Uniform（以"og_"开头）设置值。
const s_linkAutomaticUniforms = new LinkAutomaticUniformCollection();

const s_drawAutomaticUniformFactories = new DrawAutomaticUniformFactoryCollection();
s_drawAutomaticUniformFactories.add(new ModelMatrixUniformFactory());


class Device {
  
  /**
   * 创建一个GraphicsWindow对象
   * @param {String} containerId 容器元素的ID
   * @returns {GraphicsWindow} 
   */
  static CreateWindow(containerId) {
    return new GraphicsWindowGL2(containerId);
  }

  // /**
  //  * 创建一个ShaderProgram对象
  //  * @param  {String} vertexShaderSource
  //  * @param  {String} fragmentShaderSource
  //  * @returns {ShaderProgram}
  //  */
  // static CreateShaderProgram(vertexShaderSource, fragmentShaderSource) {
  //   return new ShaderProgramGL2(commonGL, vertexShaderSource, fragmentShaderSource);
  // }

  /**
   * 创建一个VertexBufferGL2对象
   * @param  {String} usageHint
   * @param  {Number} sizeInBytes
   * @returns {VertexBufferGL2}
   */
  static CreateVertexBuffer(usageHint, sizeInBytes) {
    return new VertexBufferGL2(commonGL, usageHint, sizeInBytes);
  }

  /**
   * 创建一个VertexBufferGL2对象
   * @param  {String} usageHint
   * @param  {Number} sizeInBytes
   * @returns {IndexBufferGL2}
   */
  static CreateIndexBuffer(usageHint, sizeInBytes) {
    return new IndexBufferGL2(commonGL, usageHint, sizeInBytes);
  }

  /**
   * 创建MeshBuffer
   * @param {Mesh} mesh 
   * @param {ShaderVertexAttributeCollection} shaderAttributes 
   * @param {BufferHint} usageHint 
   */
  static CreateMeshBuffers(mesh, shaderAttributes, usageHint) {
    if (mesh === null) {
      throw new Error("mesh is null.");
    }

    if (shaderAttributes === null) {
      throw new Error("shaderAttributes is null.");
    }

    const meshBuffers = new MeshBuffers();

    // 为mesh的索引数据分配显卡缓冲区并将索引数据复制到显卡缓冲区
    if (mesh.Indices !== null) {
      if (mesh.Indices.DataType === IndicesType.UnsignedShort) {
        const indices = new Uint16Array(mesh.Indices.Values);
        const indexBuffer = Device.CreateIndexBuffer(usageHint, indices.byteLength);
        indexBuffer.copyFromSystemMemory(indices);
        meshBuffers.IndexBuffer = indexBuffer;
      } else if (mesh.Indices.DataType === IndicesType.UnsignedInt) {

      } else {
        throw new Error("mesh.Indices.Datatype " +
          mesh.Indices.DataType + " is not supported.");
      }
    }

    // 为mesh的顶点属性数据分配显卡缓冲区并将索引数据复制到显卡缓冲区
    for (let i = 0, len = shaderAttributes.size(); i < len; i++) {
      const shaderAttribute = shaderAttributes.get(i);
      if (!mesh.Attributes.contains(shaderAttribute.Name)) {
        throw new Error("Shader requires vertex attribute \"" + shaderAttribute.Name + "\", which is not present in mesh.");
      }
      const attribute = mesh.Attributes.getByName(shaderAttribute.Name);
      if (attribute.DataType === VertexAttributeType.FloatVector3) {
        const vertexBuffer = this._CreateVertexBuffer(attribute.Values, usageHint);
        meshBuffers.Attributes.set(shaderAttribute.Location, 
          new VertexBufferAttributeGL2(vertexBuffer, ComponentDatatype.Float, 3));
      } else {
        throw new Error("attribute.Datatype");
      }
    }

    return meshBuffers;
  }

  /**
   * 根据包含顶点数据的数组创建对应的顶点缓冲区
   * @param {Array} values 
   * @param {BufferHint} usageHint
   */
  static _CreateVertexBuffer(values, usageHint) {
    const valuesArray = new Float32Array(values);
    const vertexBuffer = this.CreateVertexBuffer(usageHint, valuesArray.byteLength);
    vertexBuffer.copyFromSystemMemory(valuesArray);
    return vertexBuffer;
  }

  static CreateTexture2D(description) {
    return new Texture2DGL3x(description, TextureTarget.Texture2D);
  }

  /**
   * 获取着色器程序中已声明的顶点属性的数量
   * @returns {Number}
   */
  static get MaximumNumberOfVertexAttributes() {
    return commonGL.getParameter(commonGL.MAX_VERTEX_ATTRIBS);
  }

  /**
   * 获取可以使用的纹理单元的数量
   * @returns {Number}
   */
  static get NumberOfTextureUnits() {
    return commonGL.getParameter(commonGL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  }

  /**
   * 获取LinkAutomaticUniform的集合
   * @returns {LinkAutomaticUniformCollection}
   */
  static get LinkAutomaticUniforms() {
    return s_linkAutomaticUniforms;
  }

  /**
   * 获取DrawAutomaticUniformFactory的集合
   * @returns {DrawAutomaticUniformFactory}
   */
  static get DrawAutomaticUniformFactories() {
    return s_drawAutomaticUniformFactories;
  }
}

// 初始化LinkAutomaticUniformCollection
const numberOfTextureUnits = Device.NumberOfTextureUnits;
for (let i = 0; i < numberOfTextureUnits; i++) {
  s_linkAutomaticUniforms.add(new TextureUniform(i));
}

export default Device;

/**
 * GraphicsWindowGL2类是GraphicsWindow抽象类的关于WebGL2的实现类
 * GraphicsWindow类是表示窗口画布的一个抽象类，该类创建了Context类对象
 */

import GraphicsWindow from "../GraphicsWindow.js";
import ContextGL2 from "./ContextGL2.js";
import ShaderProgramGL2 from "./Shaders/ShaderProgramGL2.js";
import MeshBuffers from "../Mesh/MeshBuffers.js";
import IndicesType from "../../Core/Geometry/Indices/IndicesType.js";
import IndexBufferGL2 from "./Buffers/IndexBufferGL2.js";
import VertexAttributeType from "../../Core/Geometry/VertexAttributes/VertexAttributeType.js";
import VertexBufferGL2 from "./Buffers/VertexBufferGL2.js";
import VertexBufferAttributeGL2 from "./VertexArray/VertexBufferAttributeGL2.js";
import ComponentDatatype from "../VertexArray/ComponentDatatype.js";
import Texture2DDescription from "../Textures/Texture2DDescription.js";
import Texture2DGL2 from "./Textures/Texture2DGL2.js";
import WritePixelBufferGL2 from "./Buffers/WritePixelBufferGL2.js";
import PixelBufferHint from "../Buffers/PixelBufferHint.js";
import TextureMinificationFilter from "../Textures/TextureMinificationFilter.js";
import TextureMagnificationFilter from "../Textures/TextureMagnificationFilter.js";
import TextureWrap from "../Textures/TextureWrap.js";
import TextureSamplerGL2 from "./Textures/TextureSamplerGL2.js";
import SceneState from "../Scene/SceneState.js";

class GraphicsWindowGL2 extends GraphicsWindow {
  /**
   * 构造函数
   * @param {String} containerId 容器元素的ID
   */
  constructor(containerId) {
    super();

    const containerDiv = document.getElementById(containerId);
    // 保证容器元素是DIV元素
    if (containerDiv.nodeName !== "DIV") {
      throw new Error("Container element must be Div!");
    }
    // 创建一个canvas元素（与容器元素大小一样）放入容器元素中
    this._canvas = document.createElement("canvas");
    const width = containerDiv.clientWidth;
    const height = containerDiv.clientHeight;
    this._canvas.width = width;
    this._canvas.height = height;
    containerDiv.appendChild(this._canvas);
    // 获取WebGL2的环境对象（WebGL2RenderingContext）
    this._gl = this._canvas.getContext("webgl2");
    // this._gl.disable(this._gl.DEPTH_TEST);
    
    // 初始化内置的ContextGL2对象
    this._context = new ContextGL2(this, this._canvas.width, this._canvas.height);
  }

  /**
   * 获取内置的ContextGL对象
   * @returns {ContextGL2} 
   */
  get Context() {
    return this._context;
  }

  /**
   * 创建一个ShaderProgramGL2对象
   * @param  {String} vertexShaderSource 顶点着色器
   * @param  {String} fragmentShaderSource 片元着色器
   * @returns {ShaderProgramGL2}
   */
  createShaderProgram(vertexShaderSource, fragmentShaderSource) {
    return new ShaderProgramGL2(this._gl, vertexShaderSource, fragmentShaderSource);
  }

  /**
  * 创建一个VertexBufferGL2对象
  * @param  {BufferHint} usageHint
  * @param  {Number} sizeInBytes
  * @returns {VertexBufferGL2}
  */
  createVertexBuffer(usageHint, sizeInBytes) {
    return new VertexBufferGL2(this._gl, usageHint, sizeInBytes);
  }

  /**
  * 创建一个IndexBufferGL2对象
  * @param  {BufferHint} usageHint
  * @param  {Number} sizeInBytes
  * @returns {IndexBufferGL2}
  */
  createIndexBuffer(usageHint, sizeInBytes) {
    return new IndexBufferGL2(this._gl, usageHint, sizeInBytes);
  }

  /**
  * 创建WritePixelBufferGL2对象
  * @param {PixelBufferHint} usageHint
  * @param {Number} sizeInBytes
  * @returns {WritePixelBufferGL2}
  */
  createWritePixelBuffer(usageHint, sizeInBytes) {
    return new WritePixelBufferGL2(this._gl, usageHint, sizeInBytes);
  }

  /**
  * 创建Texture2DGL2对象
  * @param {Texture2DDescription} description 
  * @returns {Texture2DGL2}
  */
  createTexture2D(description) {
    return new Texture2DGL2(this._gl, description, this._gl.TEXTURE_2D);
  }

  /**
  * 创建TextureSamplerGL2对象
  * @param {TextureMinificationFilter} minificationFilter 
  * @param {TextureMagnificationFilter} magnificationFilter 
  * @param {TextureWrap} wrapS 
  * @param {TextureWrap} WrapT 
  * @param {Number} maximumAnistropy
  * @returns {TextureSamplerGL2}
  */
  createTexture2DSampler(minificationFilter, magnificationFilter, 
    wrapS, WrapT, maximumAnistropy) 
  {
    return new TextureSamplerGL2(this._gl, minificationFilter, magnificationFilter,
      wrapS, WrapT, maximumAnistropy);
  }

  /**
   * 创建一个SceneState
   * @returns {SceneState}
   */
  createSceneState() {
    return new SceneState(this._canvas);
  }

  /**
   * 创建MeshBuffer
   * @param {Mesh} mesh 
   * @param {ShaderVertexAttributeCollection} shaderAttributes 
   * @param {BufferHint} usageHint 
   */
  createMeshBuffers(mesh, shaderAttributes, usageHint) {
    if (!mesh) {
      throw new Error("mesh is null.");
    }

    if (!shaderAttributes) {
      throw new Error("shaderAttributes is null.");
    }

    const meshBuffers = new MeshBuffers();

    // 为mesh的索引数据分配显卡缓冲区并将索引数据复制到显卡缓冲区
    if (mesh.Indices !== null) {
      if (mesh.Indices.DataType === IndicesType.UnsignedShort) {
        const indices = new Uint16Array(mesh.Indices.Values);
        const indexBuffer = this.createIndexBuffer(usageHint, indices.byteLength);
        indexBuffer.copyFromSystemMemory(indices);
        meshBuffers.IndexBuffer = indexBuffer;
      } else if (mesh.Indices.DataType === IndicesType.UnsignedInt) {
        const indices = new Uint32Array(mesh.Indices.Values);
        const indexBuffer = this.createIndexBuffer(usageHint, indices.byteLength);
        indexBuffer.copyFromSystemMemory(indices);
        meshBuffers.IndexBuffer = indexBuffer;
      } else {
        throw new Error("mesh.Indices.Datatype " +
          mesh.Indices.DataType + " is not supported.");
      }
    }

    // 为mesh的顶点属性数据分配顶点缓冲区并将索引数据复制到索引缓冲区
    for (let i = 0, len = shaderAttributes.size(); i < len; i++) {
      const shaderAttribute = shaderAttributes.get(i);
      if (!mesh.Attributes.contains(shaderAttribute.Name)) {
        throw new Error("Shader requires vertex attribute \"" + shaderAttribute.Name + "\", which is not present in mesh.");
      }
      const attribute = mesh.Attributes.getByName(shaderAttribute.Name);
      if (attribute.DataType === VertexAttributeType.FloatVector2) {
        const floatArr = [];
        const list = attribute.Values;
        for (let i = 0, len = list.size(); i < len; i++) {
          const item = list.get(i);
          floatArr.push(item.X);
          floatArr.push(item.Y);
        }
        const vertexBuffer = this._createVertexBuffer(new Float32Array(floatArr), usageHint);
        meshBuffers.Attributes.set(shaderAttribute.Location, 
          new VertexBufferAttributeGL2(vertexBuffer, ComponentDatatype.Float, 2));
      } else if (attribute.DataType === VertexAttributeType.FloatVector3) {
        const floatArr = [];
        const list = attribute.Values;
        for (let i = 0, len = list.size(); i < len; i++) {
          const item = list.get(i);
          floatArr.push(item.X);
          floatArr.push(item.Y);
          floatArr.push(item.Z);
        }
        const vertexBuffer = this._createVertexBuffer(new Float32Array(floatArr), usageHint);
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
   * @param {Typed Array} valuesArray
   * @param {BufferHint} usageHint
   * @returns {VertexBuffer}
   */
  _createVertexBuffer(valuesArray, usageHint) {
    const vertexBuffer = this.createVertexBuffer(usageHint, valuesArray.byteLength);
    vertexBuffer.copyFromSystemMemory(valuesArray);
    return vertexBuffer;
  }
}

export default GraphicsWindowGL2;

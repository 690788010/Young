/**
 * ShaderProgramGL2是ShaderProgram这个抽象类关于WebGL2的实现类
 */

import ShaderProgram from "../../Shaders/ShaderProgram.js";
import ShaderType from "../../Shaders/ShaderType.js";
import ShaderObjectGL2 from "./ShaderObjectGL2.js";


class ShaderProgramGL2 extends ShaderProgram {
  constructor(vertexShaderSource, fragmentShaderSource) {
    super();

    this._vertexShader = new ShaderObjectGL2(ShaderType.VertexShader, vertexShaderSource);
    this._fragmentShader = new ShaderObjectGL2(ShaderType.FragmentShader, fragmentShaderSource);
  }
}

export default ShaderProgramGL2;
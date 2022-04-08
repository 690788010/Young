/**
 * FragmentOutputsGL3x
 */

import FragmentOutputs from "../../Shaders/FragmentOutputs.js";
import ShaderProgramNameGL2 from "../Names/ShaderProgramNameGL2.js";

class FragmentOutputsGL2 extends FragmentOutputs {
  /**
   * 构造函数
   * @param {WebGL2RenderingContext} gl 
   * @param {ShaderProgramNameGL2} program 
   */
  constructor(gl, program) {
    super();

    this._gl = gl;
    this._program = program;
  }

  /**
   * 获取用户定义的varying out变量的颜色数字绑定
   * @param {String} name
   * @returns {Number}
   */
  getColorNumberBinding(name) {
    const colorNum = this._gl.getFragDataLocation(this._program.Value, name);
    if (colorNum === -1) {
      throw new Error(name);
    }
    return colorNum;
  }
}

export default FragmentOutputsGL2;
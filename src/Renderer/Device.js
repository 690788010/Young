/**
 * 用于创建各个渲染对象的工厂类
 */

import GraphicsWindowGL2 from "./GL2/GraphicsWindowGL2.js";
import ShaderProgram from "./Shaders/ShaderProgram.js";
import ShaderProgramGL2 from "./GL2/Shaders/ShaderProgramGL2.js";

const WindowType = {
  Default: 0,
  FullScreen: 1
};

class Device {
  static CreateWindow(containerId, title = "", windowType = WindowType.Default) {
    return new GraphicsWindowGL2(containerId, title, windowType);
  }

  /**
   * 创建一个ShaderProgram对象
   * @param  {String} vertexShaderSource
   * @param  {String} fragmentShaderSource
   * @returns {ShaderProgram}
   */
  static CreateShaderProgram(vertexShaderSource, fragmentShaderSource) {
    return new ShaderProgramGL2(vertexShaderSource, fragmentShaderSource);
  }
}

export default Device;

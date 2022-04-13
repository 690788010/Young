/**
 * TextureSampler是一个抽象类，它用于表示纹理的采样器
 */

import Disposable from "../../Core/Disposable.js";

class TextureSampler extends Disposable{
  
  /**
   * 抽象方法
   */
  dispose() {}
}

export default TextureSampler;

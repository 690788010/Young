/**
 * WritePixelBuffer类表示像素缓冲区，用于在系统内存和纹理之间传输数据
 * WritePixelBuffer类是一个抽象类
 */

import Disposable from "../../Core/Disposable.js";
import PixelBufferHint from "./PixelBufferHint.js";

class WritePixelBuffer extends Disposable {
  

  /**
   * 抽象方法
   * @returns {Number}
   */
  get SizeInBytes() {}

  /**
   * @returns {PixelBufferHint}
   */
  get UsageHint() {}

  /**
   * 抽象方法
   */
  dispose() {}
}

export default WritePixelBuffer;
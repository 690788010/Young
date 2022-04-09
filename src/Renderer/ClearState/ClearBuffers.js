/**
 * ClearBuffers对象是表示清除哪个缓冲的枚举，或者说是位掩码
 */

const ColorBuffer = 1;
const DepthBuffer = 2;
const StencilBuffer = 4;

const ClearBuffers = {
  ColorBuffer: ColorBuffer,       // 二进制：01
  DepthBuffer: DepthBuffer,       // 二进制：10
  StencilBuffer: StencilBuffer,     // 二进制：100
  ColorAndDepthBuffer: ColorBuffer | DepthBuffer,   // 二进制：11，十进制：3
  All: ColorBuffer | DepthBuffer | StencilBuffer    // 二进制：111，十进制：7
};

export default ClearBuffers;
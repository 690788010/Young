/**
 * WebGLRenderingContext.bufferData()方法用于向顶点缓冲区传递顶点数据
 * BufferHint对象是bufferData()方法的usage参数的枚举
 */

const BufferHint = {
  StreamDraw: "StreamDraw",
  StreamRead: "StreamRead",
  StreamCopy: "StreamCopy",
  StaticDraw: "StaticDraw",
  StaticRead: "StaticRead",
  StaticCopy: "StaticCopy",
  DynamicDraw: "DynamicDraw",
  DynamicRead: "DynamicRead",
  DynamicCopy: "DynamicCopy"
};

export default BufferHint;
/**
 * VertexAttributeComponents对象是指示各个Tessellator类要计算那些顶点属性的枚举
 */

const Position = 1, Normal = 2, TextureCoordinate = 4;

const VertexAttributeComponents = {
  Position: Position,
  Normal: Normal,
  TextureCoordinate: TextureCoordinate,
  All: Position | Normal | TextureCoordinate
};

export default VertexAttributeComponents;
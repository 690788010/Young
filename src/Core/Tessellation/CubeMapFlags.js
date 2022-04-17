/**
 * CubeMapFlags对象是指示CubeMapEllipsoidTessellator类要计算多少顶点属性的枚举
 */

const Position = 1, Normal = 2, TextureCoordinate = 4;

const CubeMapFlags = {
  Position: Position,
  Normal: Normal,
  TextureCoordinate: TextureCoordinate,
  All: Position | Normal | TextureCoordinate
};

export default CubeMapFlags;
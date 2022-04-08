/**
 * VertexLocations对象是顶点着色器中attribute属性的索引位置的枚举
 */

const VertexLocations = {
  Position: 0,
  Normal: 2,
  TextureCoordinate: 3,
  Color: 4,

  // //
  // // Having Position and PositionHigh share the same location
  // // allows different shaders to share the same vertex array,
  // // even if one is using DSFUN90 and one is not.
  // //
  // // FYI There is/was an ATI bug where location was required:
  // //
  // // http://www.opengl.org/discussion_boards/ubbthreads.php?ubb=showflat&Number=286280
  // //
  // public const int PositionHigh = Position;
  // public const int PositionLow = 1;
};

export default VertexLocations;
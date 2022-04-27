import IndicesUnsignedShort from "../Geometry/Indices/IndicesUnsignedShort.js";
import Mesh from "../Geometry/Mesh.js";
import VertexAttributeFloatVector3 from "../Geometry/VertexAttributes/VertexAttributeFloatVector3.js";
import Vector3D from "../Vectors/Vector3D.js";
import TriangleIndices from "../Geometry/Indices/TriangleIndices.js";


class BoxTessellator {

  /**
   * 
   * @param {Vector3D} length 
   */
  static Compute(length) {
    if (length.X < 0 || length.Y < 0 || length.Z < 0) {
      throw new Error("length");
    }

    const mesh = new Mesh();
    const positionsAttribute = new VertexAttributeFloatVector3("position");
    mesh.Attributes.add(positionsAttribute);
    const indices = new IndicesUnsignedShort();
    mesh.Indices = indices;

    // 8 corner points
    const positions = positionsAttribute.Values;

    const corner = length.multiply(0.5);
    positions.add(new Vector3D(-corner.X, -corner.Y, -corner.Z));
    positions.add(new Vector3D(corner.X, -corner.Y, -corner.Z));
    positions.add(new Vector3D(corner.X, corner.Y, -corner.Z));
    positions.add(new Vector3D(-corner.X, corner.Y, -corner.Z));
    positions.add(new Vector3D(-corner.X, -corner.Y, corner.Z));
    positions.add(new Vector3D(corner.X, -corner.Y, corner.Z));
    positions.add(new Vector3D(corner.X, corner.Y, corner.Z));
    positions.add(new Vector3D(-corner.X, corner.Y, corner.Z));

    // 6 faces, 2 triangles each
    indices.addTriangle(new TriangleIndices(4, 5, 6));    // Top: plane z = corner.Z
    indices.addTriangle(new TriangleIndices(4, 6, 7));
    indices.addTriangle(new TriangleIndices(1, 0, 3));    // Bottom: plane z = -corner.Z
    indices.addTriangle(new TriangleIndices(1, 3, 2));
    indices.addTriangle(new TriangleIndices(1, 6, 5));    // Side: plane x = corner.X
    indices.addTriangle(new TriangleIndices(1, 2, 6));
    indices.addTriangle(new TriangleIndices(2, 3, 7));    // Side: plane y = corner.Y
    indices.addTriangle(new TriangleIndices(2, 7, 6));
    indices.addTriangle(new TriangleIndices(3, 0, 4));    // Side: plane x = -corner.X
    indices.addTriangle(new TriangleIndices(3, 4, 7));
    indices.addTriangle(new TriangleIndices(0, 1, 5));    // Side: plane y = -corner.Y
    indices.addTriangle(new TriangleIndices(0, 5, 4));

    return mesh;
  }
}

export default BoxTessellator;
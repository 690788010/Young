/**
 * SubdivisionSphereTessellatorSimple提供了细分柏拉图四面体得到球面的功能
 */

import Mesh from "../Geometry/Mesh.js";
import PrimitiveType from "../Geometry/PrimitiveType.js";
import WindingOrder from "../Geometry/WindingOrder.js";
import VertexAttributeFloatVector3 from "../Geometry/VertexAttributes/VertexAttributeFloatVector3.js";
import IndicesUnsignedInt from "../Geometry/Indices/IndicesUnsignedInt.js";
import TriangleIndices from "../Geometry/Indices/TriangleIndices.js";
import Vector3D from "../Vectors/Vector3D.js";
import List from "../List/List.js";

class SubdivisionSphereTessellatorSimple {
  /**
   * 
   * @param {Number} numberOfSubdivisions 细分次数
   * @returns {Mesh}
   */
  static Compute(numberOfSubdivisions) {
    if (numberOfSubdivisions < 0) {
      throw new Error("numberOfSubdivisions");
    } 

    const mesh = new Mesh();
    mesh.PrimititveType = PrimitiveType.Triangles;
    mesh.WindingOrder = WindingOrder.CCW;

    const positionAttribute = new VertexAttributeFloatVector3("position");
    mesh.Attributes.add(positionAttribute);
    const indices = new IndicesUnsignedInt();
    mesh.Indices = indices;
    
    // Initial tetrahedron
    const negativeRootTwoOverThree = -Math.sqrt(2.0) / 3.0;
    const negativeOneThird = -1 / 3;
    const rootSixOverThree = Math.sqrt(6.0) / 3.0;

    const positions = positionAttribute.Values;
    positions.add(new Vector3D(0, 0, 1));
    positions.add(new Vector3D(0, (2.0*Math.sqrt(2))/3, negativeOneThird));
    positions.add(new Vector3D(-rootSixOverThree, negativeRootTwoOverThree, negativeOneThird));
    positions.add(new Vector3D(rootSixOverThree, negativeRootTwoOverThree, negativeOneThird));

    // 递归
    this.Subdivide(positions, indices, new TriangleIndices(0, 1, 2), numberOfSubdivisions);
    this.Subdivide(positions, indices, new TriangleIndices(0, 2, 3), numberOfSubdivisions);
    this.Subdivide(positions, indices, new TriangleIndices(0, 3, 1), numberOfSubdivisions);
    this.Subdivide(positions, indices, new TriangleIndices(1, 3, 2), numberOfSubdivisions);

    return mesh;
  }

  /**
   * 
   * @param {List} positions 
   * @param {IndicesUnsignedInt} indices 
   * @param {TriangleIndices} triangle 
   * @param {Number} level 
   */
  static Subdivide(positions, indices, triangle, level) {
    if (level > 0) {
      positions.add(positions.get(triangle.UI0).add(positions.get(triangle.UI1)).multiply(0.5).normalize());
      positions.add(positions.get(triangle.UI1).add(positions.get(triangle.UI2)).multiply(0.5).normalize());
      positions.add(positions.get(triangle.UI2).add(positions.get(triangle.UI0)).multiply(0.5).normalize());
    
      const i01 = positions.size() - 3;
      const i12 = positions.size() - 2;
      const i20 = positions.size() - 1;
      
      // Subdivide input triangle into four triangles
      level--;
      this.Subdivide(positions, indices, new TriangleIndices(triangle.UI0, i01, i20), level);
      this.Subdivide(positions, indices, new TriangleIndices(i01, triangle.UI1, i12), level);
      this.Subdivide(positions, indices, new TriangleIndices(i01, i12, i20), level);
      this.Subdivide(positions, indices, new TriangleIndices(i20, i12, triangle.UI2), level);
    } else {
      indices.addTriangle(triangle);
    }
  }
}

export default SubdivisionSphereTessellatorSimple;
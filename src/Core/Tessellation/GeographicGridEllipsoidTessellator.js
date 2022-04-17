/**
 * GeographicGridEllipsoidTessellator类提供了Geographic-Grid细分近似球体的功能
 */

import Ellipsoid from "../Geometry/Ellipsoid.js";
import Mesh from "../Geometry/Mesh.js";
import VertexAttributeComponents from "./VertexAttributeComponents.js";
import PrimitiveType from "../Geometry/PrimitiveType.js";
import WindingOrder from "../Geometry/WindingOrder.js";
import VertexAttributeFloatVector3 from "../Geometry/VertexAttributes/VertexAttributeFloatVector3.js";
import IndicesUnsignedInt from "../Geometry/Indices/IndicesUnsignedInt.js";
import Vector3D from "../Vectors/Vector3D.js";
import TriangleIndices from "../Geometry/Indices/TriangleIndices.js";


class GeographicGridEllipsoidTessellator {

  /**
   * 
   * @param {Ellipsoid} ellipsoid 
   * @param {Number} numberOfSlicePartitions 
   * @param {Number} numberOfStackPartitions 
   * @param {VertexAttributeComponents} vertexAttributeComponents 
   */
  static Compute(ellipsoid, numberOfSlicePartitions, numberOfStackPartitions, vertexAttributeComponents) {
    if (numberOfSlicePartitions < 3) {
      throw new Error("numberOfSlicePartitions");
    }
    if (numberOfStackPartitions < 2) {
      throw new Error("numberOfStackPartitions");
    }
    if ((vertexAttributeComponents & VertexAttributeComponents.Position) !== VertexAttributeComponents.Position) {
      throw new Error("Positions must be provided.");
    }

    const mesh = new Mesh();
    mesh.PrimititveType = PrimitiveType.Triangles;
    mesh.WindingOrder = WindingOrder.CCW;

    const positionAttribute = new VertexAttributeFloatVector3("position");
    mesh.Attributes.add(positionAttribute);
    const indices = new IndicesUnsignedInt();
    mesh.Indices = indices;

    let normals = null;
    if ((vertexAttributeComponents & VertexAttributeComponents.Normal) === VertexAttributeComponents.Normal) {
      const normalsAttribute = new VertexAttributeFloatVector3("normal");
      mesh.Attributes.add(normalsAttribute);
      normals = normalsAttribute.Values;
    }

    let textureCoordinates = null;
    if ((vertexAttributeComponents & VertexAttributeComponents.TextureCoordinate) === VertexAttributeComponents.TextureCoordinate) {
      const textureCoordinatesAttribute = new VertexAttributeFloatVector3("texCoord");
      mesh.Attributes.add(textureCoordinatesAttribute);
      textureCoordinates = textureCoordinatesAttribute.Values;
    }

    // Create lookup table
    const cosTheta = new Array(numberOfSlicePartitions);
    const sinTheta = new Array(numberOfSlicePartitions);
    for (let j = 0; j < numberOfSlicePartitions; j++) {
      const theta = Math.PI * 2 * (j / numberOfSlicePartitions);
      cosTheta[j] = Math.cos(theta);
      sinTheta[j] = Math.sin(theta);
    }

    // 构建顶点
    const positions = positionAttribute.Values;
    positions.add(new Vector3D(0, 0, ellipsoid.Radii.Z));   // 极点
    for (let i = 1; i < numberOfStackPartitions; i++) {
      const phi = Math.PI * (i / numberOfStackPartitions);
      const sinPhi = Math.sin(phi);

      const xSinPhi = ellipsoid.Radii.X * sinPhi;
      const ySinphi = ellipsoid.Radii.Y * sinPhi;
      const zCosPhi = ellipsoid.Radii.Z * Math.cos(phi);

      for (let j = 0; j < numberOfSlicePartitions; j++) {
        positions.add(new Vector3D(cosTheta[j] * xSinPhi, sinTheta[j] * ySinphi, zCosPhi));
      }
    }
    positions.add(new Vector3D(0, 0, -ellipsoid.Radii.Z));    // 极点

    // 计算法向量和纹理坐标
    if ((normals !== null) || (textureCoordinates !== null)){
      for (let i = 0, len = positions.size(); i < len; ++i) {
        const deticSurfaceNormal = ellipsoid.geodeticSurfaceNormal(positions.get(i));

        if (normals !== null) {
          normals.add(deticSurfaceNormal);
        }

        if (textureCoordinates !== null) {
          // textureCoordinates.Add(SubdivisionUtility.ComputeTextureCoordinate(deticSurfaceNormal));
        }
      }
    }

    //
    // Triangle fan top row
    // 构建上极点区域的索引
    for (let j = 1; j < numberOfSlicePartitions; j++) {
      indices.addTriangle(new TriangleIndices(0, j, j + 1));
    }
    indices.addTriangle(new TriangleIndices(0, numberOfSlicePartitions, 1));

    //
    // Middle rows are triangle strips
    // 构建中间条带的索引
    for (let i = 0; i < numberOfStackPartitions - 2; i++) {
      const topRowOffset = (i * numberOfSlicePartitions) + 1;
      const bottomRowOffset = ((i + 1) * numberOfSlicePartitions) + 1;

      for (let j = 0; j < numberOfSlicePartitions - 1; j++) {
        indices.addTriangle(new TriangleIndices(bottomRowOffset + j, bottomRowOffset + j + 1, topRowOffset + j + 1));
        indices.addTriangle(new TriangleIndices(bottomRowOffset + j, topRowOffset + j + 1, topRowOffset + j));
      }
      indices.addTriangle(new TriangleIndices(bottomRowOffset + numberOfSlicePartitions - 1, bottomRowOffset, topRowOffset));
      indices.addTriangle(new TriangleIndices(bottomRowOffset + numberOfSlicePartitions - 1, topRowOffset, topRowOffset + numberOfSlicePartitions - 1));
    }

    //
    // Triangle fan bottom row
    // 构建下极点区域的索引
    const lastPosition = positions.size() - 1;
    for (let j = lastPosition - 1; j > lastPosition - numberOfSlicePartitions; j--) {
      indices.addTriangle(new TriangleIndices(lastPosition, j, j - 1));
    }
    indices.addTriangle(new TriangleIndices(lastPosition, lastPosition - numberOfSlicePartitions, lastPosition - 1));

    return mesh;
  }

  /**
   * 计算对应细分下的三角形的数量
   * @param {Number} numberOfSlicePartitions 水平方向细分成多少部分
   * @param {Number} numberOfStackPartitions 垂直方向细分成多少部分
   * @returns {Number}
   */
  static NumberOfTriangles(numberOfSlicePartitions, numberOfStackPartitions) {
    let numberOfTriangles = 2 * numberOfSlicePartitions;                                 // Top and bottom fans
    numberOfTriangles += 2 * ((numberOfStackPartitions - 2) * numberOfSlicePartitions);  // Middle triangle strips
    return numberOfTriangles;
  }

  static NumberOfVertices(numberOfSlicePartitions, numberOfStackPartitions) {
    
  }
}

export default GeographicGridEllipsoidTessellator;
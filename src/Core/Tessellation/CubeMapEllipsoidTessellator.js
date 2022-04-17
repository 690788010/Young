/**
 * CubeMapEllipsoidTessellator类提供了cubemap细分得到球面的功能
 */

import Ellipsoid from "../Geometry/Ellipsoid.js";
import Mesh from "../Geometry/Mesh.js";
import PrimitiveType from "../Geometry/PrimitiveType.js";
import WindingOrder from "../Geometry/WindingOrder.js";
import Vector3D from "../Vectors/Vector3D.js";
import VertexAttributeComponents from "./VertexAttributeComponents.js";
import List from "../List/List.js";
import Vector2D from "../Vectors/Vector2D.js";
import IndicesUnsignedInt from "../Geometry/Indices/IndicesUnsignedInt.js";
import VertexAttributeFloatVector3 from "../Geometry/VertexAttributes/VertexAttributeFloatVector3.js";
import TriangleIndices from "../Geometry/Indices/TriangleIndices.js";

class CubeMapMesh {
  constructor() {
    this._ellipsoid = null;
    this._numberOfPartitions = null;
    this._positions = null;
    this._normals = null;
    this._textureCoordinates = null;
    this._indices = null;
  }

  /**
   * @returns {Ellipsoid}
   */
  get Ellipsoid() {
    return this._ellipsoid;
  }

  /**
   * @param {Ellipsoid}
   */
  set Ellipsoid(value) {
    this._ellipsoid = value;
  }

  /**
   * @returns {Number}
   */
  get NumberOfPartitions() {
    return this._numberOfPartitions;
  }

  /**
   * @param {Number}
   */
  set NumberOfPartitions(value) {
    this._numberOfPartitions = value;
  }

  /**
   * @returns {List<Vector3D>}
   */
  get Positions() {
    return this._positions;
  }

  /**
   * @param {List<Vector3D>}
   */
  set Positions(value) {
    this._positions = value;
  }

  /**
   * @returns {List<Vector3D>}
   */
  get Normals() {
    return this._normals;
  }

  /**
   * @param {List<Vector3D>}
   */
  set Normals(value) {
    this._normals = value;
  }

  /**
   * @returns {List<Vector2D>}
   */
  get TextureCoordinates() {
    return this._textureCoordinates;
  }

  /**
   * @param {List<Vector2D>}
   */
  set TextureCoordinates(value) {
    this._textureCoordinates = value;
  }

  /**
   * @returns {IndicesUnsignedInt}
   */
  get Indices() {
    return this._indices;
  }

  /**
   * @param {IndicesUnsignedInt}
   */
  set Indices(value) {
    this._indices = value;
  }
}

class CubeMapEllipsoidTessellator {
  /**
   * 
   * @param {Ellipsoid} ellipsoid 
   * @param {Number} numberOfPartitions 
   * @param {VertexAttributeComponents} vertexAttributeComponents 
   * @returns {Mesh}
   */
  static Compute(ellipsoid, numberOfPartitions, vertexAttributeComponents) {
    if (numberOfPartitions < 0) {
      throw new  Error("numberOfPartions");
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

    const cubeMapMesh = new CubeMapMesh();
    cubeMapMesh.Ellipsoid = ellipsoid;
    cubeMapMesh.NumberOfPartitions = numberOfPartitions;
    cubeMapMesh.Positions = positionAttribute.Values;
    cubeMapMesh.Indices = indices;

    if ((vertexAttributeComponents & VertexAttributeComponents.Normal) === VertexAttributeComponents.Normal) {
      const normalsAttribute = new VertexAttributeFloatVector3("normal");
      mesh.Attributes.add(normalsAttribute);
      cubeMapMesh.Normals = normalsAttribute.Values;
    }

    if ((vertexAttributeComponents & VertexAttributeComponents.TextureCoordinate) === VertexAttributeComponents.TextureCoordinate) {
      const textureCoordinatesAttribute = new VertexAttributeFloatVector3("texCoord");
      mesh.Attributes.add(textureCoordinatesAttribute);
      cubeMapMesh.Normals = textureCoordinatesAttribute.Values;
    }

    //
    // Initial cube.  In the plane, z = -1:
    //
    //                   +y
    //                    |
    //             Q2     * p3     Q1
    //                  / | \
    //              p0 *--+--* p2   +x
    //                  \ | /
    //             Q3     * p1     Q4
    //                    |
    //
    // Similarly, p4 to p7 are in the plane z = 1.
    //
    // 新增立方体的八个顶点
    cubeMapMesh.Positions.add(new Vector3D(-1, 0, -1));
    cubeMapMesh.Positions.add(new Vector3D(0, -1, -1));
    cubeMapMesh.Positions.add(new Vector3D(1, 0, -1));
    cubeMapMesh.Positions.add(new Vector3D(0, 1, -1));
    cubeMapMesh.Positions.add(new Vector3D(-1, 0, 1));
    cubeMapMesh.Positions.add(new Vector3D(0, -1, 1));
    cubeMapMesh.Positions.add(new Vector3D(1, 0, 1));
    cubeMapMesh.Positions.add(new Vector3D(0, 1, 1));

    //
    // Edges
    //
    // 0 -> 1, 1 -> 2, 2 -> 3, 3 -> 0.  Plane z = -1
    // 4 -> 5, 5 -> 6, 6 -> 7, 7 -> 4.  Plane z = 1
    // 0 -> 4, 1 -> 5, 2 -> 6, 3 -> 7.  From plane z = -1 to plane z - 1
    //
    // 为立方体各条边添加中间部分细分的顶点，并计算该边各个顶点的索引
    const edge0to1 = this.AddEdgePositions(0, 1, cubeMapMesh); 
    const edge1to2 = this.AddEdgePositions(1, 2, cubeMapMesh);
    const edge2to3 = this.AddEdgePositions(2, 3, cubeMapMesh);
    const edge3to0 = this.AddEdgePositions(3, 0, cubeMapMesh);

    const edge4to5 = this.AddEdgePositions(4, 5, cubeMapMesh);
    const edge5to6 = this.AddEdgePositions(5, 6, cubeMapMesh);
    const edge6to7 = this.AddEdgePositions(6, 7, cubeMapMesh);
    const edge7to4 = this.AddEdgePositions(7, 4, cubeMapMesh);
    
    const edge0to4 = this.AddEdgePositions(0, 4, cubeMapMesh);
    const edge1to5 = this.AddEdgePositions(1, 5, cubeMapMesh);
    const edge2to6 = this.AddEdgePositions(2, 6, cubeMapMesh);
    const edge3to7 = this.AddEdgePositions(3, 7, cubeMapMesh);

    // 添加各个面里细分的三角形
    this.AddFaceTriangles(edge0to4, edge0to1, edge1to5, edge4to5, cubeMapMesh); // Q3 Face
    this.AddFaceTriangles(edge1to5, edge1to2, edge2to6, edge5to6, cubeMapMesh); // Q4 Face
    this.AddFaceTriangles(edge2to6, edge2to3, edge3to7, edge6to7, cubeMapMesh); // Q1 Face
    this.AddFaceTriangles(edge3to7, edge3to0, edge0to4, edge7to4, cubeMapMesh); // Q2 Face
    this.AddFaceTriangles(edge7to4.reverse(), edge4to5, edge5to6, edge6to7.reverse(), cubeMapMesh); // Plane z = 1
    this.AddFaceTriangles(edge1to2, edge0to1.reverse(), edge3to0.reverse(), edge2to3, cubeMapMesh); // Plane z = -1

    this.CubeToEllipsoid(cubeMapMesh);
    return mesh;
  }
  /**
   * 为端点为i0、i1的边添加中间部分细分的顶点，并计算该边各个顶点的索引
   * @param {Number} i0 
   * @param {Number} i1 
   * @param {CubeMapMesh} cubeMapMesh 
   * @returns {Array<Number>}
   */
  static AddEdgePositions(i0, i1, cubeMapMesh) {
    const positions = cubeMapMesh.Positions;
    const numberOfPartions = cubeMapMesh.NumberOfPartitions;

    const indices = new Array(2 + (numberOfPartions - 1));
    indices[0] = i0;
    indices[indices.length - 1] = i1;

    const origin = positions.get(i0);
    const direction = positions.get(i1).subtract(origin);   // 该边的方向向量

    for (let i = 1, len = numberOfPartions; i < len; i++) {
      const delta = i / numberOfPartions;

      indices[i] = positions.size();      // 新增顶点索引
      positions.add(origin.add(direction.multiply(delta)));   // 新增顶点
    }

    return indices;
  }

  /**
   * 添加一个面里每个细分的三角形
   * @param {Array<Number>} leftBottomToTop 
   * @param {Array<Number>} bottomLeftToRight 
   * @param {Array<Number>} rightBottomToTop 
   * @param {Array<Number>} topLeftToRight 
   * @param {CubeMapMesh} cubeMapMesh 
   */
  static AddFaceTriangles(
    leftBottomToTop,
    bottomLeftToRight,
    rightBottomToTop,
    topLeftToRight,
    cubeMapMesh)
  {
    const positions = cubeMapMesh.Positions;
    const indices = cubeMapMesh.Indices;
    const numberOfPartions = cubeMapMesh.NumberOfPartitions;

    const origin = positions.get(bottomLeftToRight[0]);
    const x = positions.get(bottomLeftToRight[bottomLeftToRight.length - 1]).subtract(origin);
    const y = positions.get(topLeftToRight[0]).subtract(origin);

    let topIndices = new Array(numberOfPartions + 1);
    let bottomIndices = new Array(numberOfPartions + 1);
    bottomIndices = bottomLeftToRight;
    
    // 遍历一个面的每一个正方形
    for (let j = 1; j <= numberOfPartions; j++) {
      if (j !== numberOfPartions) {
        if (j !== 1) {
          bottomIndices = topIndices;
          topIndices = new Array(numberOfPartions + 1);
        }

        topIndices[0] = leftBottomToTop[j];
        topIndices[numberOfPartions] = rightBottomToTop[j];

        const deltaY = j / numberOfPartions;
        const offsetY = y.multiply(deltaY);

        for (let i = 1; i < numberOfPartions; i++) {
          const deltaX = i / numberOfPartions;
          const offsetX = x.multiply(deltaX);

          topIndices[i] = positions.size();
          positions.add(origin.add(offsetX).add(offsetY));
        }
      } else {
        if (j !== 1) {
          bottomIndices = topIndices;
        } 
        topIndices = topLeftToRight;
      }

      // 在同一行从左到右添加每一个正方形里的两个三角形
      for (let i = 0; i < numberOfPartions; i++) {
        indices.addTriangle(new TriangleIndices(
          bottomIndices[i], bottomIndices[i + 1], topIndices[i + 1]));
        indices.addTriangle(new TriangleIndices(
          bottomIndices[i], topIndices[i + 1], topIndices[i]));
      } 
    }
  }

  static CubeToEllipsoid(cubeMapMesh) {
    const positions = cubeMapMesh.Positions;
    
    for (let i = 0, len = positions.size(); i < len; i++) {
      positions.set(i, positions.get(i).normalize().multiplyComponents(cubeMapMesh.Ellipsoid.Radii));
      
      if ((cubeMapMesh.Normals !== null) || (cubeMapMesh.TextureCoordinates !== null)) {
        const geodeticSurfaceNormal = cubeMapMesh.Ellipsoid.geodeticSurfaceNormal(positions.get(i));
        
        if (cubeMapMesh.Normals !== null) {
          cubeMapMesh.Normals.add(geodeticSurfaceNormal);
        }

        if (cubeMapMesh.TextureCoordinates !== null) {

        }
      }
    }
  }

  /**
   * 计算对应细分下的三角形的数量
   * @param {Number} numberOfPartions 
   * @returns {Number}
   */
  static NumberOfTriangles(numberOfPartions) {
    return 6 * 2 * numberOfPartions * numberOfPartions;
  }

  /**
   * 计算对应细分下的顶点的数量
   * @param {Number} numberOfPartions 
   * @returns {Number}
   */
  static NumberOfVertices(numberOfPartions) {
    const numberOfPartionsMinusOne = numberOfPartions - 1;
    let numberOfVertices = 8;               // 所有角上的顶点数
    numberOfVertices += 12 * numberOfPartionsMinusOne;  // 所有边上的顶点数
    numberOfVertices += 6 * numberOfPartionsMinusOne * numberOfPartionsMinusOne;    // 所有面上的顶点数
    return numberOfVertices;
  }
}

export default CubeMapEllipsoidTessellator;
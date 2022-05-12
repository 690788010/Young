#version 300 es      // 声明版本

layout (location = og_posVertexLoc) in vec3 position;

uniform mat4 og_modelViewPerspectiveMatrix;
uniform float og_perspectiveFarPlaneDistance;   // 远平面距离

uniform bool u_logarithmicDepth;    // 标识是否开启对数深度缓冲
uniform float u_logarithmicDepthConstant;   // 对数深度缓冲的常系数

vec4 applyLogarithmicDepth(vec4 clipPosition, bool logarithmicDepth,
  float logarithmicDepthConstant, float perspectiveFarPlaneDistance)
{
  if (logarithmicDepth) {
    clipPosition.z = ((2.0 * log((logarithmicDepthConstant * clipPosition.z) + 1.0) / 
      log((logarithmicDepthConstant * perspectiveFarPlaneDistance) + 1.0)) - 1.0) * clipPosition.w;
  }

  return clipPosition;
}

void main() {
  vec4 clipPosition = og_modelViewPerspectiveMatrix * vec4(position, 1.0);
  gl_Position = applyLogarithmicDepth(clipPosition, u_logarithmicDepth, u_logarithmicDepthConstant, og_perspectiveFarPlaneDistance);

}
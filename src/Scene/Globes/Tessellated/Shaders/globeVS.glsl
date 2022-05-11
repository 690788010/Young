#version 300 es      // 声明版本

layout (location = og_posVertexLoc) in vec3 position;

uniform mat4 og_modelViewPerspectiveMatrix;
uniform float og_perspectiveFarPlaneDistance;   // 远平面距离

uniform vec3 og_cameraEye;
uniform vec3 og_cameraLightPosition;
uniform bool u_logarithmicDepth;    // 标识是否开启对数深度缓冲
uniform float u_logarithmicDepthConstant;   // 对数深度缓冲的常系数

out vec3 worldPosition;
out vec3 positionToLight;
out vec3 positionToEye;

vec4 modelToClipCoordinates(vec3 position, mat4 modelViewPerspectiveMatrix, 
  bool logarithmicDepth, float logarithmicDepthConstant, float perspectiveFarPlaneDistance) 
{
  vec4 clip = modelViewPerspectiveMatrix * vec4(position, 1.0);

  if (logarithmicDepth) {
    clip.z = ((2.0 * log((logarithmicDepthConstant * clip.z) + 1.0) / 
              log((logarithmicDepthConstant * perspectiveFarPlaneDistance) + 1.0)) - 1.0) * clip.w;
  }

  return clip;
}

void main() {
  gl_Position = modelToClipCoordinates(position, og_modelViewPerspectiveMatrix, 
    u_logarithmicDepth, u_logarithmicDepthConstant, og_perspectiveFarPlaneDistance);
  
  worldPosition = position.xyz;
  positionToLight = og_cameraLightPosition - worldPosition;
  positionToEye = og_cameraEye - worldPosition;
}
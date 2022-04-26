#version 300 es      // 声明版本
layout (location = og_posVertexLoc) in vec3 position;

uniform mat4 og_modelViewPerspectiveMatrix;
uniform vec3 og_cameraEye;
uniform vec3 og_cameraLightPosition;

out vec3 worldPosition;
out vec3 positionToLight;
out vec3 positionToEye;

void main() {
  gl_Position = og_modelViewPerspectiveMatrix * vec4(position, 1.0);

  worldPosition = position.xyz;
  positionToLight = og_cameraLightPosition - worldPosition;
  positionToEye = og_cameraEye - worldPosition;
}
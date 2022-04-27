#version 300 es

layout (location = og_posVertexLoc) in vec3 position;
out vec3 worldPosition;

uniform mat4 og_modelViewPerspectiveMatrix;

void main() {
  gl_Position = og_modelViewPerspectiveMatrix * vec4(position, 1.0); 
  worldPosition = position.xyz;
}

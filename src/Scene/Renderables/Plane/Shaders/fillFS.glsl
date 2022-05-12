#version 300 es      // 声明版本

uniform vec3 u_color;
uniform float u_alpha;

out vec4 FragColor;

void main() {
  FragColor = vec4(u_color, u_alpha);
}
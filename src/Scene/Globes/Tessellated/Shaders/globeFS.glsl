#version 300 es      // 声明版本

in vec3 worldPosition;
in vec3 positionToLight;
in vec3 positionToEye;

uniform vec4 og_diffuseSpecularAmbientShininess;
uniform bool u_Textured;
uniform sampler2D og_texture0;

out vec4 FragColor;

float lightIntensity(vec3 normal, vec3 toLight, vec3 toEye, 
  vec4 diffuseSpecularAmbientShininess)
{
  vec3 toReflectedLight = reflect(-toLight, normal);

  float diffuse = max(dot(toLight, normal), 0.0);
  float specular = max(dot(toReflectedLight, toEye), 0.0);
  specular = pow(specular, diffuseSpecularAmbientShininess.w);

  return (diffuseSpecularAmbientShininess.x * diffuse) +
    (diffuseSpecularAmbientShininess.y * specular) +
    diffuseSpecularAmbientShininess.z;
}

vec2 computeTextureCoordinates(vec3 normal){
  return vec2(atan(normal.y, normal.x) * og_oneOverTwoPi + 0.5, 1.0 - (asin(normal.z) * og_oneOverPi + 0.5));
}

void main() {
  vec3 normal = normalize(worldPosition);
  float intensity = lightIntensity(normal, normalize(positionToLight), normalize(positionToEye), og_diffuseSpecularAmbientShininess);

  if (u_Textured) {
    FragColor = vec4(intensity * texture(og_texture0, computeTextureCoordinates(normal)).rgb, 1.0);
  } else {
    FragColor = vec4(intensity, 0, intensity, 1.0);
  }
}
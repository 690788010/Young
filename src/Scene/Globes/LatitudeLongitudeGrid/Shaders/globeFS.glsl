#version 300 es       // 声明版本

in vec3 worldPosition;
in vec3 positionToLight;
in vec3 positionToEye;

uniform vec2 u_gridLineWidth;
uniform vec2 u_gridResolution;
uniform vec3 u_globeOneOverRadiiSquared;

uniform vec4 og_diffuseSpecularAmbientShininess;
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
  return vec2(atan(normal.y, normal.x) * og_oneOverTwoPi + 0.5, asin(normal.z) * og_oneOverPi + 0.5);
}

vec3 geodeticSurfaceNormal(vec3 positionOnEllipsoid, vec3 oneOverEllipsoidRadiiSquared) {
    return normalize(positionOnEllipsoid * oneOverEllipsoidRadiiSquared);
}



void main() {
  vec3 normal = geodeticSurfaceNormal(worldPosition, u_globeOneOverRadiiSquared);
  vec2 texCoord = computeTextureCoordinates(normal);

  vec2 distanceToLine = mod(texCoord, u_gridResolution);

  vec2 dx = abs(dFdx(texCoord));
  vec2 dy = abs(dFdy(texCoord));
  vec2 dF = vec2(dx.s, dy.t) * u_gridLineWidth;

  if (any(lessThan(distanceToLine, dF))) {
    FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  } else {
    float intensity = lightIntensity(normal, normalize(positionToLight),
      normalize(positionToEye), og_diffuseSpecularAmbientShininess);
    FragColor = vec4(intensity * texture(og_texture0, vec2(texCoord.x, 1.0 - texCoord.y)).rgb, 1.0);
  }
}
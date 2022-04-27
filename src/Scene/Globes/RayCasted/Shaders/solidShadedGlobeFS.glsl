#version 300 es
             
in vec3 worldPosition;
out vec4 FragColor;

uniform vec4 og_diffuseSpecularAmbientShininess;
uniform mat4 og_modelViewPerspectiveMatrix;
uniform vec3 og_cameraEye;
uniform vec3 u_cameraEyeSquared;
uniform vec3 u_globeOneOverRadiiSquared;
uniform bool u_useAverageDepth;

struct Intersection {
  bool  Intersects;
  float NearTime;         // Along ray
  float FarTime;          // Along ray
};

//
// Assumes ellipsoid is at (0, 0, 0)
//
Intersection rayIntersectEllipsoid(vec3 rayOrigin, vec3 rayOriginSquared, vec3 rayDirection, vec3 oneOverEllipsoidRadiiSquared) {
  float a = dot(rayDirection * rayDirection, oneOverEllipsoidRadiiSquared);
  float b = 2.0 * dot(rayOrigin * rayDirection, oneOverEllipsoidRadiiSquared);
  float c = dot(rayOriginSquared, oneOverEllipsoidRadiiSquared) - 1.0;
  float discriminant = b * b - 4.0 * a * c;

    if (discriminant < 0.0) {
        return Intersection(false, 0.0, 0.0);
    }
    else if (discriminant == 0.0)
    {
        float time = -0.5 * b / a;
        return Intersection(true, time, time);
    }

    float t = -0.5 * (b + (b > 0.0 ? 1.0 : -1.0) * sqrt(discriminant));
    float root1 = t / a;
    float root2 = c / t;

    return Intersection(true, min(root1, root2), max(root1, root2));
}

float computeWorldPositionDepth(vec3 position, mat4 mvpMatrix) { 
  vec4 v = mvpMatrix * vec4(position, 1);   // clip coordinates
  v.z /= v.w;                                             // normalized device coordinates
  v.z = (v.z + 1.0) * 0.5;
  return v.z;
}

void main() {
  vec3 rayDirection = normalize(worldPosition - og_cameraEye);
  Intersection i = rayIntersectEllipsoid(og_cameraEye, u_cameraEyeSquared, rayDirection, u_globeOneOverRadiiSquared);

  if (i.Intersects) {
    vec3 position = og_cameraEye + (i.NearTime * rayDirection);

    FragColor = vec4(0.0, 1.0, 1.0, 1.0);

    if (u_useAverageDepth) {
      position = og_cameraEye + (mix(i.NearTime, i.FarTime, 0.5) * rayDirection);
    }

    gl_FragDepth = computeWorldPositionDepth(position, og_modelViewPerspectiveMatrix);
  } else {
    FragColor = vec4(1, 0.2, 0.2, 1.0);
  }
}
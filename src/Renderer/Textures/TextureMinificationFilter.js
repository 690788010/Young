/**
 * TextureMinificationFilter是纹理采样对应缩小情况下采样方式的枚举
 */

const TextureMinificationFilter = {
  NEAREST: "NEAREST",
  LINEAR: "LINEAR",
  NEAREST_MIPMAP_NEAREST: "NEAREST_MIPMAP_NEAREST",
  LINEAR_MIPMAP_NEAREST: "LINEAR_MIPMAP_NEAREST",
  NEAREST_MIPMAP_LINEAR: "NEAREST_MIPMAP_LINEAR",
  LINEAR_MIPMAP_LINEAR: "LINEAR_MIPMAP_LINEAR"
};

export default TextureMinificationFilter;
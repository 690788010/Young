/**
 * TextureMinificationFilter是纹理采样对应缩小情况下采样方式的枚举
 */

const TextureMinificationFilter = {
  Nearest: "Nearest",
  Linear: "Linear",
  NearestMipmapNearest: "NearestMipmapNearest",
  LinearMipmapNearest: "LinearMipmapNearest",
  NearestMipmapLinear: "NearestMipmapLinear",
  LinearMipmapLinear: "LinearMipmapLinear"
};

export default TextureMinificationFilter;
/**
 * TextureSamplerGL2类是TextureSampler抽象类基于WebGL2的实现类
 * TextureSampler类是一个抽象类，它用于表示纹理的采样器
 */

import TextureSampler from "../../Textures/TextureSampler";

class TextureSamplerGL2 extends TextureSampler{

  constructor(minificationFilter, magnificationFilter, 
    wrapS, wrapT, maximumAnistropy) {
    super();

    
  }
}

export default TextureSamplerGL2;
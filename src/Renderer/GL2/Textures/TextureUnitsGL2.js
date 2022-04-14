/**
 * TextureUnitsGL2是TextureUnits抽象类基于WebGL2的实现类
 * TextureUnits类是一个抽象类，用于包含多个TextureUnit对象
 * TextureUnits类同时是观察者设计模式中的观察者，当TextureUnit的状态属性被改变时，
 * 将会通知TextureUnits这个观察者类
 */

import TextureUnits from "../../Textures/TextureUnits.js";
import TextureUnitGL2 from "./TextureUnitGL2.js";
import List from "../../../Core/List/List.js";
import Device from "../../Device.js";

class TextureUnitsGL2 extends TextureUnits {
  constructor(gl) {
    super();
    
    // WebGL支持的所有着色器阶段可以使用的纹理单元总数
    const numberOfTextureUnits = Device.MAX_COMBINED_TEXTURE_IMAGE_UNITS;
    
    // 包含一个TextureUnitGL2的数组
    this._textureUnits = [];
    for (let i = 0; i < numberOfTextureUnits; i++) {
      const textureUnit = new TextureUnitGL2(gl, i, this);
      this._textureUnits.push(textureUnit);
    }
    // _dirtyTextureUnits用于保存更新的TextureUnitGL2
    this._dirtyTextureUnits = new List();
    this._lastTextureUnit = this._textureUnits[numberOfTextureUnits - 1];
  }

  /**
   * 为被设置新值的TextureUnitGL2使用GL调用进行更新
   */
  clean() {
    for (let i = 0, len = this._dirtyTextureUnits.size(); i < len; i++) {
      this._dirtyTextureUnits.get(i).clean();
    }
    this._dirtyTextureUnits.clear();
  }

  /**
   * 这个方法将在TextureUnitGL2类的状态属性被改变时，
   * 由TextureUnitGL2调用来通知TextureUnitsGL2
   * @param {TextureUnitGL2} value 
   */
  notifyDirty(value) {
    this._dirtyTextureUnits.add(value);
  }

  /**
   * @returns {Number}
   */
  get Count() {
    return this._textureUnits.length;
  }

  /**
   * @param {Number} index 
   * @returns {TextureUnitGL2}
   */
  get(index) {
    return this._textureUnits[index];
  }
}

export default TextureUnitsGL2;
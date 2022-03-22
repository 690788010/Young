/**
 * ShaderVertexAttribute类
 */

class ShaderVertexAttribute {
  constructor(name, location, type, length) {
    this._name = name;
    this._location = location;
    this._type = type;
    this._length = length;
  }

  get Name() {
    return this._name;
  }

  get Location() {
    return this._location;
  }

  get Type() {
    return this._type;
  }

  get Length() {
    return this._length;
  }
}

export default ShaderVertexAttribute;

class Vector4D {
  constructor(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  get X() {
    return this._x;
  }

  get Y() {
    return this._y;
  }

  get Z() {
    return this._z;
  }

  get W() {
    return this._w;
  }
}

export default Vector4D;
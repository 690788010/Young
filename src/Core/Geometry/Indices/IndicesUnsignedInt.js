
import IndicesBase from "./IndicesBase.js";
import IndicesType from "./IndicesType.js";

class IndicesUnsignedInt extends IndicesBase{
  constructor() {
    super();
    this._indicesType = IndicesType.UnsignedInt;

    this._values = [];
  }
}

export default IndicesUnsignedInt;
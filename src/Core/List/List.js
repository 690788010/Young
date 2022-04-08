/**
 * List类用于表示集合
 */

class List {
  constructor() {
    this._values = [];
  }

  /**
   * 返回集合的长度
   * @returns {Number}
   */
   size() {
    return this._values.length;
  }

  /**
   * 添加一个元素
   * @param  {Object} item
   */
  add(item) {
    this._values.push(item);
  }

  /**
   * 通过索引访问元素
   * @param {Number} index 
   * @returns {Object}
   */
  get(index) {
    return this._values[index];
  }
}

export default List;
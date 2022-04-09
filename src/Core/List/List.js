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
   * 根据name判断集合中是否包含该元素
   * @param {String} name
   * @returns {Boolean}
   */
  contains(name) {
    for (let i = 0, len = this._values.length; i < len; i++) {
      if (this._values[i].Name === name) {
        return true;
      }
    }
    return false;
  }

  /**
   * 通过索引访问元素
   * @param {Number} index 
   * @returns {Object}
   */
  get(index) {
    return this._values[index];
  }

  /**
   * 通过name获取特定元素
   * @param {String} name 
   * @returns {Object}
   */
  getByName(name) {
    for (let i = 0, len = this._values.length; i < len; i++) {
      if (this._values[i].Name === name) {
        return this._values[i];
      }
    }
  }

  /**
   * 清空集合
   */
  clear() {
    this._values = [];
  } 
}

export default List;
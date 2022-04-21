
class Shader {

  /**
   * 加载着色器文件
   * @param {String} path 
   * @returns 
   */
  static loadShaderFile(path) {
    const endIndex = window.location.href.indexOf("Young");
    path = window.location.href.substring(0, endIndex) + path;
    const xhr = new XMLHttpRequest();
    let res = null;
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
        res = xhr.responseText
      }
    });
    xhr.open("GET", path, false);
    xhr.send(null);
    return res;
  }
}

export default Shader;
/**
 * Camera类表示相机
 */

import Vector3D from "../../Core/Vectors/Vector3D.js";

class Camera {
  /**
   * 构造函数
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    this._canvas = canvas;

    this._eye = Vector3D.UnitY;
    this._target = Vector3D.Zero;
    this._up = Vector3D.UnitZ;

    this._initEventHandlers();
  }

  /**
   * 初始化时事件绑定
   */
  _initEventHandlers() {
    let dragging = false;         // 标识鼠标是否在拖拽
    let lastX = 0, lastY = 0;   // 鼠标光标所在的上一个位置

    this._canvas.addEventListener('mousedown', (event) => {
      console.log("mousedown");
      const x = event.clientX, y = event.clientY;
      // Start dragging if a moue is in <canvas>
      var rect = event.target.getBoundingClientRect();
      // 如果鼠标点击位置在canvas区域就记录下来
      if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
          lastX = x; lastY = y;
          dragging = true;
      }
    });

    this._canvas.addEventListener('mousemove', (event) => {
      const x = event.clientX, y = event.clientY;
      if (dragging) {
          const factor = 100 / this._canvas.height; // The rotation ratio
          const dx = factor * (x - lastX);
          const dy = factor * (y - lastY);
          this._eye.rotate(-dx, [0, 0, 1]);
          this._eye.rotate(dy, [1, 0, 0]);
      }
      lastX = x, lastY = y;
    });

    this._canvas.addEventListener('mouseup', () => {
      dragging = false;       // 标识鼠标已释放
    });
  }

  /**
   * @returns {Vector3D}
   */
  get Eye() {
    return this._eye;
  }

  /**
   * @param {Vector3D} vector3D
   */
  set Eye(vector3D) {
    this._eye = vector3D;
  }

  /**
   * @returns {Vector3D}
   */
  get Target() {
    return this._target;
  }

  /**
   * @param {Vector3D} vector3D
   */
  set Target(vector3D) {
    this._target = vector3D;
  }

  /**
   * @returns {Vector3D}
   */
  get Up() {
    return this._up;
  }

  /**
   * @param {Vector3D} vector3D
   */
  set Up(vector3D) {
    this._up = vector3D;
  }
}

export default Camera;
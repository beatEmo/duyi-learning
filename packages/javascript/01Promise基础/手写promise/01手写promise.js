// 记录Promise的三种状态
const PENDING = "pending";
const FULFILLED = "fullfilled";
const REJECTED = "rejected";

class MyPromise {
  /**
   * 创建一个Promise
   * @param {Function} executor 任务执行器，任务立即执行
   */
  constructor(executor) {
    // 状态
    this._state = PENDING;
    // 数据
    this._value = void 0;
    // 对Promise的异常处理
    try {
      // 让调用resolve或reject时他们的this也指向myPromise
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (e) {
      this._reject(e);
    }
  }

  /**
   * 改变promise的状态
   * @param {*} state 对应的状态
   * @param {any} value 状态对应的数据
   */
  _changeState(state, value) {
    if (this._state !== PENDING) {
      // 状态发生改变后就不可再变
      return;
    }
    this._state = state;
    this._value = value;
  }

  /**
   * 标记当前任务成功
   * @param {any} data 任务完成相关数据
   */
  _resolve(data) {
    // 改变状态和数据
    this._changeState(FULFILLED, data);
  }
  /**
   * 标记当前任务失败
   * @param {any} reason 任务失败相关原因
   */
  _reject(reason) {
    // 改变状态和数据
    this._changeState(REJECTED, reason);
  }
}

const mpro = new MyPromise((resolve, reject) => {
  throw new Error("11");
});
console.log(mpro);

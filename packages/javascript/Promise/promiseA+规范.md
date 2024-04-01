### promise规范

1. 所有异步场景都视为一个异步任务，每一个异步任务在JS中表现为一个对象，称为Promise对象（任务对象）。
2. 每一个Promise对象，都有俩个阶段和三个状态
   1. 任务总是从未决到已决，无法逆行
   2. 任务总是从挂起变为完成或失败，无法逆行
   3. 一旦任务完成或失败，状态就固定下来，不可改变
3. 挂起 -> 完成：resolve；挂起 -> 失败：reject。任务完成有一个相关数据，任务失败有一个失败原因。
4. 针对任务做后续处理，完成状态的后续处理onFulfilled，失败的后续处理onRejected。


### promise的基础使用

> 1. 创建一个Promise的任务对象
> 2. 这个对象接收一个函数
>    1. 函数接收俩个参数，成功和失败状态调用
>    2. 将对应数据或失败原因传给Promise最终状态
> 3. 这个promise此时打印，发现它处于pending
>    状态

```js
const pro = new Promise((resolve, reject) => {
  console.log("立即执行");
  const duration = Math.floor(Math.random() * 5000);
  setTimeout(() => {
    if (Math.random() < 0.5) {
      // 成功
      resolve(duration);
    } else {
      // 失败
      reject("我挂了!");
    }
  }, duration);
});
```

> 1. 通过 then 来接收Promise的最终状态，成功或失败
> 2. 最后针对结果做 onFulfulled 或 onRejected

```js
pro.then(
  (data) => {
    console.log(`成功了！跑了${data}秒`);
  },
  (reason) => {
    console.log(`不好意思, ${reason}`);
  }
);
```

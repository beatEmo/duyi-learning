### 消除回调

有了Promise，异步任务就有了一种统一的处理方式

有了统一的处理方式，ES官方就可以对其进一步优化

ES7推出了两个关键字 `async`和 `await`，用于更加优雅的表达Promise


### async

> async关键字用于修饰函数，被它修饰的函数，一定返回Promise

```js
async function method1(){
  return 1; // 该函数的返回值是Promise完成后的数据
}

method1(); // Promise { 1 }

async function method2(){
  return Promise.resolve(1); // 若返回的是Promise，则method得到的Promise状态和其一致
}

method2(); // Promise { 1 }

async function method3(){
  throw new Error(1); // 若执行过程报错，则任务是rejected
}

method3(); // Promise { <rejected> Error(1) }
```


### await

> `await`关键字表示等待某个Promise完成，**它必须用于 `async`函数中**

```js
async function method(){
  const n = await Promise.resolve(1);
  console.log(n); // 1
}

// 上面的函数等同于
function method(){
  return new Promise((resolve, reject)=>{
    Promise.resolve(1).then(n=>{
      console.log(n);
      resolve(1)
    })
  })
}
```

> `await`也可以等待其他数据

```js
async function method(){
  const n = await 1; // 等同于 await Promise.resolve(1)
}
```

> 如果需要针对失败的任务进行处理，可以使用 `try-catch`语法

```js
async function method(){
  try{
    const n = await Promise.reject(123); // 这句代码将抛出异常
    console.log('成功', n)
  }
  catch(err){
    console.log('失败', err)
  }
}

method(); // 输出： 失败 123
```

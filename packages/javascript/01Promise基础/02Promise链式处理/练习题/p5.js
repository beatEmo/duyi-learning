// 下面的代码输出什么

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject();
  }, 1000);
});
const promise2 = promise1.catch(() => {
  return 2;
});

console.log("promise1", promise1);
console.log("promise2", promise2);

setTimeout(() => {
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);

// promise1 pending
// promise2 pending
// promise1 rejected undefined
// promise2 fulfilled 2

// 得到一个随机数组成的数组，数组长度为10
// 结果类似于：[0.262, 0.167, 0.841, ...]
const arr1 = [];

for (let i = 0; i < 10; i++) {
  arr1.push(Math.random() * 10);
}

console.log(arr1);

// 得到一个随机数组成的数组，数组长度为10，随机数的范围在0-1之间
// 结果类似于：[0.262, 0.167, 0.841, ...]
const arr1 = [];
for (let i = 0; i < 10; i++) {
  arr1.push(Math.random());
}
console.log(arr1);
// 得到一个随机数组成的数组，数组长度为10，随机数的范围在10-100之间
// 结果类似于：[35, 66, 45, ...]
const arr2 = [];
for (let i = 0; i < 10; i++) {
  arr2.push(Math.floor(Math.random() * (100 - 10 + 1) + 10));
}
console.log(arr2);

// 判断某个字符串s是否为 .jpg、.png、.bmp、.gif 中的一个
const arr3 = [".jpg", ".png", ".bmp", ".gif"];
console.log(arr3.includes("ss"));

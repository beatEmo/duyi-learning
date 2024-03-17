const obj = {
  a: 1,
  b: 2,
  c: 3
};
// 遍历对象的所有属性名
// for (const key in obj) {
//   console.log(key);
// }
// for (const key of Object.keys(obj)) {
//   console.log(key);
// }

// 遍历对象的所有属性值
// for (const key in obj) {
//   console.log(obj[key]);
// }
// for (const value of Object.values(obj)) {
//   console.log(value);
// }

// 遍历对象的所有属性名和属性值
// for (const [key, value] of Object.entries(obj)) {
//   console.log(key, value);
// }

// 复制obj的所有属性到一个新的对象
// const newObj = { ...obj };
// console.log(newObj);

// 复制obj除a以外的所有属性到一个新的对象
const newObj = {};
for (const key of Object.keys(obj)) {
  if (key === "a") {
    continue;
  }
  newObj[key] = obj[key];
}
console.log(newObj);

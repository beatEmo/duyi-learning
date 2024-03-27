const pro = new Promise((resolve, reject) => {
  reject(1);
});

const p1 = pro.catch(() => {
  return new Promise((resolve, reject) => {});
});

setTimeout(() => {
  console.log(p1);
}, 1000);

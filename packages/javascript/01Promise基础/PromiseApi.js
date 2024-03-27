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

pro.then(
  (data) => {
    console.log(`成功了！跑了${data}秒`);
  },
  (reason) => {
    console.log(`不好意思, ${reason}`);
  }
);

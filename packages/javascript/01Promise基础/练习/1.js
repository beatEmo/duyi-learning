/**
 * 延迟一段指定的时间
 * @param {Number} duration 等待的时间
 * @returns {Promise} 返回一个任务，这个任务在指定时间后完成
 */
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("finish");
    }, duration);
  });
}

// 按要求调用delay函数，完成程序
// 利用delay函数，等待1s，输出finish
delay(1000).then((data) => {
  console.log(data);
});

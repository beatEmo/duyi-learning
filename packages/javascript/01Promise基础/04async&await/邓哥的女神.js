// 女神的名字数组
const beautyGirls = [
  "梁平",
  "邱杰",
  "王超",
  "冯秀兰",
  "赖军",
  "顾强",
  "戴敏",
  "吕涛",
  "冯静",
  "蔡明",
  "廖磊",
  "冯洋",
  "韩杰",
  "江涛",
  "文艳",
  "杜秀英",
  "丁艳",
  "邓静",
  "江刚",
  "乔刚",
  "史平",
  "康娜",
  "袁磊",
  "龙秀英",
  "姚静",
  "潘娜",
  "萧磊",
  "邵勇",
  "李芳",
  "谭芳",
  "夏秀英",
  "程娜",
  "武杰",
  "崔军",
  "廖勇",
  "崔强",
  "康秀英",
  "余磊",
  "邵勇",
  "贺涛"
];

// 向某位女生发送一则表白短信
// name: 女神的姓名
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}

(async () => {
  let isSuccess = false;
  for (const name of beautyGirls) {
    try {
      const reply = await sendMessage(name);
      console.log(reply);
      isSuccess = true;
      console.log("表白成功");
      break;
    } catch (reply) {
      console.log(reply);
      console.log("表白失败");
    }
  }
  if (!isSuccess) {
    console.log("注孤生");
  }
})();

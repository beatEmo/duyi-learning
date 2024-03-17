/**
 * 创建一个用户对象
 * 对象格式：
 * {
 *    firstName: xxx,
 *    lastName: xxx,
 *    fullName: xxx,
 *    sayHello: fn
 * }
 */
function createUser(firstName, lastName) {
  function fn() {
    console.log("hello");
  }
  return {
    firstName: firstName,
    lastName: lastName,
    fullName: firstName + " " + lastName,
    sayHello: fn
  };
}

// 调用createUser函数，使用解构得到fullName
const { fullName } = createUser("王", "小二");
console.log(fullName);

import axios from "axios";
import lodash from "lodash";
import path from "node:path";

const str = "hello";
str.charAt(0);
window.addEventListener("click", (e) => {});
type User = {
  id: number;
  name: string;
  show?: (id: number, name: string) => void;
};

const u: User = {
  id: 1,
  name: "张三",
  show(id, name) {
    console.log(id, name);
  }
};

const users: Array<User> = [
  { id: 1, name: "jack" },
  { id: 2, name: "rose" }
];

function addUser(u: User) {
  // todos...
  return true;
}

addUser(u);

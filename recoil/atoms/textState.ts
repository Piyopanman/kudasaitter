import { atom } from "recoil";

const textState = atom({
  key: "textState",
  default: "5000兆円欲しい！！！",
});

export default textState;

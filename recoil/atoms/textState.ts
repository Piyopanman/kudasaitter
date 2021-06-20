import { atom } from "recoil";

const textState = atom({
  key: "textState",
  default: `【急募】\n5000兆円欲しい！！！`,
});

export default textState;

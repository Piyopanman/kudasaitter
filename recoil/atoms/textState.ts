import { atom } from "recoil";

const textState = atom({
  key: "textState",
  default: `【たくさん欲しい】\n🍫お菓子ください！！！🍬`,
});

export default textState;

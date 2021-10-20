import { atom } from "recoil";
import { textSample } from "../../constant/textSample";

const textState = atom({
  key: "textState",
  default: textSample.hallween,
});

export default textState;

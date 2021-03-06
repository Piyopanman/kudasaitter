import { atom } from "recoil";
import { textSample } from "../../constant/textSample";

const textState = atom({
  key: "textState",
  default: textSample.normal,
});

export default textState;

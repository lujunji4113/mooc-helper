import { atom } from "recoil";

const modeState = atom<"light" | "dark" | "system">({
  key: "modeState",
  default: "system",
});

export default modeState;

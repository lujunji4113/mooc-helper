import { atom, useRecoilState } from "recoil";

const modeState = atom<"light" | "dark">({
  key: "modeState",
  default: "light",
});

export const useModeState = () => {
  return useRecoilState(modeState);
};

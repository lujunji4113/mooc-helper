import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const messageState = atom({
  key: "messageState",
  default: "",
});

export const useSetMessage = () => {
  return useSetRecoilState(messageState);
};

export const useMessageState = () => {
  return useRecoilState(messageState);
};

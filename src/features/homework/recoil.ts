import type { Homework } from "./interface";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const homeworkListState = atom<Homework[]>({
  key: "homeworkListState",
  default: [],
});

export const useHomeworkList = () => {
  return useRecoilValue(homeworkListState);
};

export const useSetHomeworkList = () => {
  return useSetRecoilState(homeworkListState);
};

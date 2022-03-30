import type { Chapter } from "./interface";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const selectedChapterState = atom<Chapter | null>({
  key: "selectedChapterState",
  default: null,
});

export const useSetSelectedChapter = () => {
  return useSetRecoilState(selectedChapterState);
};

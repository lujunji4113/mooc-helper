import type { Question } from "./interface";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const questionListState = atom<Question[]>({
  key: "QuestionListState",
  default: [],
});

export const useQuestionList = () => {
  return useRecoilValue(questionListState);
};

export const useSetQuestionList = () => {
  return useSetRecoilState(questionListState);
};

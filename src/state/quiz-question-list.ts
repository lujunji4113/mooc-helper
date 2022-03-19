import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export interface QuizQuestionOption {
  id: string;
  answer: boolean;
  content: string;
}

export interface QuizQuestion {
  id: string;
  type: number;
  plainTextTitle: string;
  optionDtos: QuizQuestionOption[];
}

const quizQuestionListState = atom<QuizQuestion[]>({
  key: "quizQuestion",
  default: [],
});

export const useQuizQuestionList = () => {
  return useRecoilValue(quizQuestionListState);
};

export const useSetQuizQuestionList = () => {
  return useSetRecoilState(quizQuestionListState);
};

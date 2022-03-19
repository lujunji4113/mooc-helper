import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export interface HomeworkQuestionScorePoint {
  id: string;
  msg: string;
}

export interface HomeworkQuestion {
  id: string;
  type: number;
  plainTextTitle: string;
  judgeDtos: HomeworkQuestionScorePoint[];
}

const homeWorkQuestionListState = atom<HomeworkQuestion[]>({
  key: "homeworkQuestionListState",
  default: [],
});

export const useHomeworkQuestionList = () => {
  return useRecoilValue(homeWorkQuestionListState);
};

export const useSetHomeworkQuestionList = () => {
  return useSetRecoilState(homeWorkQuestionListState);
};

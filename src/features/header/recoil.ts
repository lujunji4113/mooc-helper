import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const enableAddCourseState = atom({
  key: "enableAddCourseState",
  default: true,
});

export const useEnableAddCourseState = () => {
  return useRecoilState(enableAddCourseState);
};

export const useSetEnableAddCourse = () => {
  return useSetRecoilState(enableAddCourseState);
};

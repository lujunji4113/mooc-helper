import type { Course } from "@/features/course-drawer";
import * as React from "react";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import axios from "axios";

export const openCourseDrawerState = atom({
  key: "openCourseDrawerState",
  default: false,
});

export const useOpenCourseDrawerState = () => {
  return useRecoilState(openCourseDrawerState);
};

export const useSetOpenCourseDrawer = () => {
  return useSetRecoilState(openCourseDrawerState);
};

const selectedCourseState = atom<Course | null>({
  key: "selectedCourseState",
  default: null,
});

export const useSetSelectedCourse = () => {
  return useSetRecoilState(selectedCourseState);
};

export const useSelectedCourse = () => {
  return useRecoilValue(selectedCourseState);
};

export const courseListState = atom<Course[]>({
  key: "courseListState",
  default: [],
});

export const useCourseList = () => {
  return useRecoilValue(courseListState);
};

export const useUpdateCourseList = () => {
  const setCourseList = useSetRecoilState(courseListState);

  return React.useMemo(
    () => async () => {
      const res = await axios({
        url: "https://qckftx.api.cloudendpoint.cn/courseList",
        method: "GET",
        params: {
          "mob-token": localStorage.getItem("mob-token") ?? "",
        },
      });
      const { status, results } = res.data;
      if (status.code === 0) {
        setCourseList(results.result);
      }
    },
    [setCourseList]
  );
};

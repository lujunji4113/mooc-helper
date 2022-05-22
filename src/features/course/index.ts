import { atom } from "recoil";
import CourseDrawer from "./CourseDrawer";
import CourseCard from "./CourseCard";

export const courseListState = atom<Course[]>({
  key: "courseListState",
  default: [],
});

export const recentCourseListState = atom<Course[]>({
  key: "recentListState",
  default: [],
});

export const selectedCourseState = atom<Course | null>({
  key: "selectedCourseState",
  default: null,
});

export const selectedContentState = atom<{
  type: "homework" | "quiz";
  contentId: number;
} | null>({
  key: "selectedContentState",
  default: null,
});

export const countState = atom({
  key: "countState",
  default: 0,
});

export { CourseDrawer, CourseCard };

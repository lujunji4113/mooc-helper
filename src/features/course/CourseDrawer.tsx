import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import BookIcon from "@mui/icons-material/Book";
import Pagination from "@mui/material/Pagination";
import CourseCard from "@/features/course/CourseCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countState, courseListState, selectedCourseState } from ".";
import { courseList as getCourseList } from "@/api";
import { PAGE_SIZE } from "@/constants";
import { messageState } from "@/features/message";

export default function SwipeableTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const [courseList, setCourseList] = useRecoilState(courseListState);
  const count = useRecoilValue(countState);
  const setMessage = useSetRecoilState(messageState);
  const setSelectedCourse = useSetRecoilState(selectedCourseState);

  const changeCourseList: (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => void = React.useCallback(async (_, page: number) => {
    try {
      const { status, results } = await getCourseList(page, PAGE_SIZE);
      if (status.code === 0) {
        setCourseList(results.result);
      } else {
        setMessage({
          show: true,
          msg: status.message,
        });
      }
    } catch (error) {
      setMessage({
        show: true,
        msg: String(error),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCourse = React.useCallback((course: Course) => {
    setSelectedCourse(course);
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Tooltip title="课程" enterDelay={300}>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <BookIcon color="primary" fontSize="small" />
        </IconButton>
      </Tooltip>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={(theme) => ({
            overflow: "auto",
            "&::-webkit-scrollbar-thumb": {
              border: `3px solid ${theme.palette.primaryDark["900"]}`,
              borderRadius: 20,
              backgroundColor: theme.palette.primaryDark["700"],
            },
            "&::-webkit-scrollbar": {
              width: 12,
            },
          })}
        >
          {courseList.map((course) => (
            <CourseCard
              width={300}
              key={course.id}
              course={course}
              onClick={selectCourse}
            />
          ))}
          <Pagination count={count} onChange={changeCourseList} />
        </Box>
      </SwipeableDrawer>
    </>
  );
}

import * as React from "react";
import * as recoil from "recoil";
import type { Course } from "./interface";

import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CourseCard from "./CourseCard";

import {
  useOpenCourseDrawerState,
  useSetSelectedCourse,
  courseListState,
} from "./recoil";
import { getAllMyCourseList } from "src/api";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1);
  const [courseList, setCourseList] = recoil.useRecoilState(courseListState);

  const fetchData = async () => {
    if (page <= pageSize) {
      const { status, results } = await getAllMyCourseList(page, 9);

      if (status.code === 0) {
        const { pagination, result } = results;
        const { pageIndex, pageSize } = pagination;
        setPageSize(pageSize);
        setPage(pageIndex + 1);
        setCourseList([...courseList, ...result]);
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useOpenCourseDrawerState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const setSelectedCourse = useSetSelectedCourse();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleSelectCourse = (course: Course) => {
    setOpen(false);
    setSelectedCourse(course);
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        // onOpen={() => setOpen(true)}
      >
        <InfiniteScroll
          height="100vh"
          dataLength={courseList.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          // loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer("right", false)}
            onKeyDown={toggleDrawer("right", false)}
          >
            <List>
              {courseList.map((course) => (
                <ListItem
                  button
                  key={course.id}
                  onClick={() => handleSelectCourse(course)}
                >
                  <CourseCard course={course} />
                </ListItem>
              ))}
            </List>
          </Box>
        </InfiniteScroll>
      </SwipeableDrawer>
    </div>
  );
}

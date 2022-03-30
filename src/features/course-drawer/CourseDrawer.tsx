import * as React from "react";
import type { Course } from "./interface";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CourseCard from "./CourseCard";

import {
  useOpenCourseDrawerState,
  useSetSelectedCourse,
  useCourseList,
  useUpdateCourseList,
} from "./recoil";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  const courseList = useCourseList();
  const updateCourseList = useUpdateCourseList();
  React.useEffect(() => {
    updateCourseList();
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

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
}

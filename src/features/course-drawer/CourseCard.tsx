import type { Course } from "./interface";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Paper
      component={Button}
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        p: 2,
        "& svg": {
          transition: "0.2s",
        },
        "&:hover": {
          "& svg": {
            transform: "translateY(-2px)",
          },
        },
      }}
    >
      <Avatar
        src={course.imgUrl}
        alt={course.name}
        sx={{ borderRadius: "4px", width: 50, height: 50 }}
      />
      <Box sx={{ ml: 2, overflow: "hidden" }}>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            textAlign: "left",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {course.name}{" "}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: "left",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {course.schoolPanel.name}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CourseCard;

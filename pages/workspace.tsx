import type { NextPage } from "next";

import { useQuizQuestionList, useHomeworkQuestionList } from "@/state";

import Box from "@mui/material/Box";
import NoSsr from "@mui/material/NoSsr";

import WidthVariableBox from "@/features/width-variable-box";
import CourseTreeView from "@/features/course-tree-view";
import Paper from "@/features/paper";
import Homework from "@/features/homework";

export const Workspace: NextPage = () => {
  const quizQuestionList = useQuizQuestionList();
  const homeworkQuestionList = useHomeworkQuestionList();

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 56px)",
        overflow: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "primaryDark.900" : "grey.50",
      }}
    >
      <NoSsr>
        <WidthVariableBox>
          <CourseTreeView />
        </WidthVariableBox>
        <Box
          sx={{
            overflow: "auto",
          }}
        >
          <Paper quizQuestionList={quizQuestionList} />
          <Homework homeworkQuestionList={homeworkQuestionList} />
        </Box>
      </NoSsr>
    </Box>
  );
};

export default Workspace;

import * as React from "react";
import Box from "@mui/material/Box";
import SingleChoice from "./questions/SingleChoice";
import MultipleChoice from "./questions/MultipleChoice";
import Completion from "./questions/Completion";
import { useQuestionList } from "./recoil";
import type {
  CompletionQuestion,
  MultipleChoiceQuestion,
  SingleChoiceQuestion,
} from "./interface";

const Paper: React.FC = () => {
  const questionList = useQuestionList();

  const renderPaperInfo = () => {
    return questionList.map((question) => {
      switch (question.type) {
        case 1:
        case 4:
          return (
            <SingleChoice
              key={question.id}
              question={question as SingleChoiceQuestion}
            />
          );
        case 2:
          return (
            <MultipleChoice
              key={question.id}
              question={question as MultipleChoiceQuestion}
            />
          );
        case 3:
          return (
            <Completion
              key={question.id}
              question={question as CompletionQuestion}
            />
          );
        default:
          return null;
      }
    });
  };

  return <Box>{renderPaperInfo()}</Box>;
};

export default Paper;

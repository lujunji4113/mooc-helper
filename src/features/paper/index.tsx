import type { QuizQuestion } from "@/state";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SingleChoice, MultipleChoice } from "./question-option";

interface PaperProps {
  quizQuestionList: QuizQuestion[];
}

const Paper: React.FC<PaperProps> = ({ quizQuestionList }) => {
  const renderQuestionOption = (objectiveQuestion: QuizQuestion) => {
    switch (objectiveQuestion.type) {
      case 1:
      case 4:
        return <SingleChoice optionDtos={objectiveQuestion.optionDtos} />;
      case 2:
        return <MultipleChoice optionDtos={objectiveQuestion.optionDtos} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      {quizQuestionList.map((question, index) => {
        return (
          <Box
            key={question.id}
            component="span"
            sx={{
              display: "flex",
              p: 2,
              my: 1,
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "center" },
              transitionProperty: "all",
              transitionDuration: "150ms",
              "&:hover, &:focus": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "primaryDark.800"
                    : "grey.100",
                "@media (hover: none)": {
                  bgcolor: "transparent",
                },
              },
            }}
          >
            <span>
              <Typography
                color="text.primary"
                variant="h6"
                fontWeight="bold"
                display="block"
              >
                {`${index + 1}、${question.plainTextTitle}`}
              </Typography>
              {renderQuestionOption(question)}
            </span>
          </Box>
        );
      })}
    </Box>
  );
};

export default Paper;

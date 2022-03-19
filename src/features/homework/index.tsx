import type { HomeworkQuestion } from "@/state";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface HomeworkProps {
  homeworkQuestionList: HomeworkQuestion[];
}

const Homework: React.FC<HomeworkProps> = ({ homeworkQuestionList }) => {
  return (
    <Box>
      {homeworkQuestionList.map((question, index) => {
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
                {question.plainTextTitle}
              </Typography>
              <Typography>
                {question.judgeDtos.map((judgeDtosItem) => (
                  <span
                    key={judgeDtosItem.id}
                    dangerouslySetInnerHTML={{ __html: judgeDtosItem.msg }}
                  ></span>
                ))}
              </Typography>
            </span>
          </Box>
        );
      })}
    </Box>
  );
};

export default Homework;

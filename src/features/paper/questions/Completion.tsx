import type { CompletionQuestion } from "../interface";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { clearInlineStyle } from "../../../util";

interface CompletionProps {
  question: CompletionQuestion;
}

const Completion: React.FC<CompletionProps> = ({ question }) => {
  return (
    <Box
      key={question.id}
      component="span"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        my: 1,
        transitionProperty: "all",
        transitionDuration: "150ms",
        "&:hover, &:focus": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "primaryDark.700" : "grey.100",
          "@media (hover: none)": {
            bgcolor: "transparent",
          },
        },
      }}
    >
      <Typography
        color="text.primary"
        variant="h6"
        fontWeight="bold"
        display="block"
      >
        {clearInlineStyle(question.title)}
      </Typography>
      <Typography
        sx={{
          mt: 2,
        }}
      >
        {question.stdAnswer.replace(/##%_YZPRLFH_%##/g, "或者")}
      </Typography>
    </Box>
  );
};

export default Completion;

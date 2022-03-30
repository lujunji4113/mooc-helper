import type { MultipleChoiceQuestion } from "../interface";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { clearInlineStyle } from "../../../util";

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ question }) => {
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
      <FormControl>
        <FormGroup>
          {question.optionDtos.map((optionDto) => (
            <FormControlLabel
              key={optionDto.id}
              control={<Checkbox checked={optionDto.answer} />}
              label={
                <Typography>{clearInlineStyle(optionDto.content)}</Typography>
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default MultipleChoice;

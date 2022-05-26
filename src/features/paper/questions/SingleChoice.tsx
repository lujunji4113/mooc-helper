import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import HTML from "@/components/HTML";

interface SingleChoiceProps {
  question: ObjectiveQ;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({ question }) => {
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
        <HTML html={question.title} />
      </Typography>
      <FormControl>
        <RadioGroup
          value={
            question.optionDtos.find((optionDtosItem) => optionDtosItem.answer)
              ?.id
          }
        >
          {question.optionDtos.map((optionDto) => (
            <FormControlLabel
              key={optionDto.id}
              value={optionDto.id}
              control={<Radio />}
              label={
                <Typography>
                  <HTML html={optionDto.content} />
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SingleChoice;

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export interface OptionDtosItem {
  id: string;
  answer: boolean;
  content: string;
}

interface OptionDtosProps {
  optionDtos: OptionDtosItem[];
}

const HTMLLabel: React.FC<{ label: string }> = ({ label }) => {
  return <Typography dangerouslySetInnerHTML={{ __html: label }} />;
};

export const SingleChoice: React.FC<OptionDtosProps> = ({ optionDtos }) => {
  return (
    <FormControl>
      <RadioGroup
        value={optionDtos.find((optionDtosItem) => optionDtosItem.answer)?.id}
      >
        {optionDtos.map((optionDtosItem) => (
          <FormControlLabel
            key={optionDtosItem.id}
            value={optionDtosItem.id}
            control={<Radio />}
            label={<HTMLLabel label={optionDtosItem.content} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export const MultipleChoice: React.FC<OptionDtosProps> = ({ optionDtos }) => {
  return (
    <FormControl>
      <FormGroup>
        {optionDtos.map((optionDtosItem) => (
          <FormControlLabel
            key={optionDtosItem.id}
            control={<Checkbox checked={optionDtosItem.answer} />}
            label={<HTMLLabel label={optionDtosItem.content} />}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

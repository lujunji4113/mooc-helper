import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface IdGetterProps {
  label: string;
  onComplete: (id: string) => void;
}

const IdGetter: React.FC<IdGetterProps> = ({ label, onComplete }) => {
  const [id, setId] = useState("");

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setId(event.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      onComplete(id.trim());
    }
  };

  const handleClick = () => {
    if (id.trim()) {
      onComplete(id.trim());
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: 1,
        }}
      >
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          type="number"
          value={id}
          sx={{
            marginRight: 2,
          }}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button variant="outlined" onClick={handleClick}>
          Get
        </Button>
      </Box>
    </Container>
  );
};

export default IdGetter;

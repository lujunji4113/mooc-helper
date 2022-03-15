import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const StyledImage = styled("img")({});

const Help: React.FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: 1,
      }}
    >
      <StyledImage
        sx={{
          width: { xs: "100%", md: 600, lg: 1200 },
        }}
        src="/desc.png"
        alt="desc"
      />
    </Card>
  );
};

export default Help;

import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import GradientText from "../components/GradientText";

const Home: NextPage = () => {
  return (
    <Container>
      <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
        <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
          The <GradientText>mooc&nbsp;helper</GradientText> you always wanted
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;

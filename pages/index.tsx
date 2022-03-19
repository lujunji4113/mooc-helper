import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

const GradientText = styled("span")<{
  color?: "primary" | "error" | "success" | "warning";
}>(({ theme, color = "primary" }) => ({
  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const Home: NextPage = () => {
  return (
    <Box>
      <Container>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            The React <GradientText>UI&nbsp;library</GradientText> you always
            wanted
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            MUI provides a robust, customizable, and accessible library of
            foundational and advanced components, enabling you to build your
            design system and develop React applications faster.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

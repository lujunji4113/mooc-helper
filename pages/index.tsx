import type { NextPage } from "next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppHeader } from "@/features/header";
import { CourseDrawer, useSelectedCourse } from "@/features/course-drawer";
import { CourseTreeView } from "@/features/chapter-tree-view";
import { Paper } from "@/features/paper";
import { Homework } from "@/features/homework";
import { Message } from "@/features/message";

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
  const selectedCourse = useSelectedCourse();

  const renderContent = () => {
    if (!selectedCourse) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box>
            <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
              The Mooc <GradientText>&nbsp;helper</GradientText> you always
              wanted
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
              Search for 中国大学MOOC慕课 unit quiz, unit assignment answers.
            </Typography>
          </Box>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          maxHeight: "calc(100vh - 56px)",
        }}
      >
        <Box
          sx={{
            position: {
              xs: "fixed",
              sm: "fixed",
              md: "relative",
              lg: "relative",
            },
            width: { xs: "100%", sm: "100%", md: 300, lg: 300 },
            backdropFilter: "blur(20px)",
            zIndex: 1,
            overflow: "auto",
          }}
        >
          <CourseTreeView />
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "calc(100vh - 56px)",
            overflow: "auto",
            marginTop: { xs: 5.4, sm: 5.4, md: 0, lg: 0 },
          }}
        >
          <Paper />
          <Homework />
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <AppHeader />
      <CourseDrawer />
      {renderContent()}
      <Message />
    </Box>
  );
};

export default Home;

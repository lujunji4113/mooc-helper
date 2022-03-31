import * as React from "react";
import { useSetOpenCourseDrawer } from "@/features/course-drawer";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

import Link from "@/components/Link";
import CourseIcon from "./icons/CourseIcon";
import SvgLogo from "./icons/SvgLogo";
import AddCourse from "./AddCourse";
import AddToken from "./AddToken";
import ThemeModeToggle from "./ThemeModeToggle";

import { styled, alpha } from "@mui/material/styles";
import { useEnableAddCourseState } from "./recoil";

const Header = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  transition: theme.transitions.create("top"),
  zIndex: theme.zIndex.appBar,
  backdropFilter: "blur(20px)",
  boxShadow: `inset 0px -1px 1px ${
    theme.palette.mode === "dark"
      ? theme.palette.primaryDark[700]
      : theme.palette.grey[100]
  }`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.primaryDark[900], 0.72)
      : "rgba(255,255,255,0.72)",
}));

const AppHeader: React.FC = () => {
  const [enableAddCourse, setEnableAddCourse] = useEnableAddCourseState();
  const openCourseDrawer = useSetOpenCourseDrawer();

  React.useEffect(() => {
    setEnableAddCourse(!localStorage.getItem("mob-token"));
  }, []);

  return (
    <Header>
      <Container sx={{ display: "flex", alignItems: "center", minHeight: 56 }}>
        <Box
          component={Link}
          href="/"
          aria-label="Go to homepage"
          sx={{ lineHeight: 0, mr: 2 }}
        >
          <SvgLogo />
        </Box>
        <Box sx={{ ml: "auto" }} />
        <Stack direction="row" spacing={1}>
          <AddToken />
          {enableAddCourse && <AddCourse />}

          <Tooltip title="课程" enterDelay={300}>
            <IconButton onClick={() => openCourseDrawer(true)}>
              <CourseIcon color="primary" fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Github 存储库" enterDelay={300}>
            <IconButton
              component="a"
              color="primary"
              href="https://github.com/lujunji-xiaolu/mooc-helper"
              target="_blank"
              data-ga-event-category="header"
              data-ga-event-action="github"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <ThemeModeToggle />
        </Stack>
      </Container>
    </Header>
  );
};

export default AppHeader;

import { useModeState } from "@/features/theme";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

import Link from "@/components/Link";
import SvgLogo from "./svg-logo";
import HeaderNavBar from "./header-nav-bar";
import ThemeModeToggle from "./theme-mode-toggle";

import { styled, alpha } from "@mui/material/styles";

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
  const [mode, setMode] = useModeState();

  const handleChangeThemeMode = (checked: boolean) => {
    const paletteMode = checked ? "dark" : "light";
    setMode(paletteMode);
  };

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
        <Box>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: "auto" }} />
        <Stack direction="row" spacing={1}>
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
          <ThemeModeToggle
            checked={mode === "dark"}
            onChange={handleChangeThemeMode}
          />
        </Stack>
      </Container>
    </Header>
  );
};

export default AppHeader;

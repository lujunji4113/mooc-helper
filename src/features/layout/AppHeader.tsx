import * as React from "react";
import Container from "@mui/material/Container";
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

const AppHeader: React.FC = ({ children }) => {
  return (
    <Header>
      <Container sx={{ display: "flex", alignItems: "center", minHeight: 56 }}>
        {children}
      </Container>
    </Header>
  );
};

export default AppHeader;

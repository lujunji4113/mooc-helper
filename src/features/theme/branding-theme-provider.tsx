import * as React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useModeState } from "./mode-state";

import { deepmerge } from "@mui/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getDesignTokens, getThemedComponents } from "./branding-theme";

export default function BrandingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useModeState();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode, setMode]);

  const theme = React.useMemo(() => {
    const designTokens = getDesignTokens(mode);
    let newTheme = createTheme(designTokens);
    newTheme = deepmerge(newTheme, getThemedComponents(newTheme));
    return newTheme;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

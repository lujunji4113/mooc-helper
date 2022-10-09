import * as React from "react";
import { useRecoilState } from "recoil";
import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import modeState from "./modeState";
import { getDesignTokens, getThemedComponents } from "./brandingTheme";
import store from "@/lib/store";

export function useTheme() {
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("light");
  const [mode, setMode] = useRecoilState(modeState);

  React.useEffect(() => {
    if (mode === "system") {
      const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
      setThemeMode(mediaQueryList.matches ? "dark" : "light");
    } else {
      setThemeMode(mode);
    }
  }, [mode]);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (ev: MediaQueryListEvent) => {
      if (mode === "system") {
        setThemeMode(ev.matches ? "dark" : "light");
      }
    };
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [mode]);

  React.useEffect(() => {
    store.get("mode").then((storedMode) => {
      const preferMode = (storedMode ?? "system") as
        | "light"
        | "dark"
        | "system";
      setMode(preferMode);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = React.useMemo(() => {
    const designTokens = getDesignTokens(themeMode);
    let newTheme = createTheme(designTokens);
    newTheme = deepmerge(newTheme, getThemedComponents(newTheme));
    return newTheme;
  }, [themeMode]);

  return theme;
}

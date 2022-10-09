import * as React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { styled } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { modeState } from "@/features/theme";
import store from "@/lib/store";

const IconToggleButton = styled(ToggleButton)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  "& > *": {
    marginRight: "8px",
  },
});

export default function ModeToggleButton() {
  const [mode, setMode] = useRecoilState(modeState);

  const changeMode = (_: any, value: "light" | "dark" | "system") => {
    store.set("mode", value);
    setMode(value);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={mode}
      color="primary"
      onChange={changeMode}
      aria-labelledby="settings-mode"
      fullWidth
    >
      <IconToggleButton
        value="light"
        aria-label="light"
        data-ga-event-category="settings"
        data-ga-event-action="light"
      >
        <LightModeIcon fontSize="small" />
        light
      </IconToggleButton>
      <IconToggleButton
        value="system"
        aria-label="system"
        data-ga-event-category="settings"
        data-ga-event-action="system"
      >
        <SettingsBrightnessIcon fontSize="small" />
        system
      </IconToggleButton>
      <IconToggleButton
        value="dark"
        aria-label="dark"
        data-ga-event-category="settings"
        data-ga-event-action="dark"
      >
        <DarkModeOutlinedIcon fontSize="small" />
        dark
      </IconToggleButton>
    </ToggleButtonGroup>
  );
}

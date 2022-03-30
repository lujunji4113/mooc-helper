import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";

import { useModeState } from "@/features/theme";

export default function ThemeModeToggle() {
  const [mode, setMode] = useModeState();
  const darkMode = mode === "dark";

  return (
    <Tooltip title={darkMode ? "开灯" : "关灯"}>
      <IconButton
        color="primary"
        disableTouchRipple
        onClick={() => setMode(darkMode ? "light" : "dark")}
      >
        {darkMode ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}

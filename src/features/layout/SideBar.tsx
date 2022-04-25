import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

export const SideBar: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        width: 50,
        height: "100vh",
        borderRight: `2px solid ${theme.palette.primary[600]}`,
      })}
    >
      <Tooltip title="Github 存储库" enterDelay={300} dir="right">
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
    </Box>
  );
};

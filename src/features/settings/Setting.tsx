import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ModeToggleButton from "./ModeToggleButton";
import MobToken from "./MobToken";
import { styled } from "@mui/material/styles";

const Heading = styled(Typography)(({ theme }) => ({
  margin: "20px 0 10px",
  color: theme.palette.grey[600],
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(11),
  textTransform: "uppercase",
  letterSpacing: ".08rem",
}));

export default function Settings() {
  const [open, setOpen] = React.useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  return (
    <>
      <Tooltip title="设置" enterDelay={300}>
        <IconButton color="primary" disableTouchRipple onClick={onOpen}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        onClose={onClose}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            width: { xs: 310, sm: 360 },
            borderRadius: "10px 0px 0px 10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="body1" fontWeight="500">
            设置
          </Typography>
          <IconButton color="inherit" onClick={onClose} edge="end">
            <CloseIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ pl: 2, pr: 2 }}>
          <Heading gutterBottom id="settings-mode">
            主题
          </Heading>
          <ModeToggleButton />
          <Heading gutterBottom id="settings-mode">
            mob-token
          </Heading>
          <MobToken />
        </Box>
      </Drawer>
    </>
  );
}

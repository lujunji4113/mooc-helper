import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Link from "@/components/Link";
import TokenIcon from "@mui/icons-material/Token";

import { useSetMessage } from "@/features/message";
import { useUpdateCourseList } from "@/features/course-drawer";
import { useSetEnableAddCourse } from "./recoil";

const AddToken: React.FC = () => {
  const [token, setToken] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const setMessage = useSetMessage();
  const setEnableAddCourse = useSetEnableAddCourse();
  const updateCourseList = useUpdateCourseList();

  const handleClose = () => {
    setToken("");
    setOpen(false);
  };

  const handleAddToken = async () => {
    if (token !== (localStorage.getItem("mob-token") ?? "")) {
      localStorage.setItem("mob-token", token);
      setToken("");
      setOpen(false);
      setMessage("设置成功");
      setEnableAddCourse(false);
      updateCourseList();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      handleAddToken();
      setTimeout(() => {
        setOpen(false);
      }, 0);
    }
  };

  React.useEffect(() => {
    if (open) {
      setToken(localStorage.getItem("mob-token") ?? "");
    }
  }, [open]);

  return (
    <>
      <Tooltip title="mob-token" enterDelay={300}>
        <IconButton onClick={() => setOpen(true)}>
          <TokenIcon color="primary" fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>设置 mob-token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            设置 mob-token 后所有数据都是您的个人的数据，mob-token
            存储在浏览器的 localStorage
            中，在每次请求时均会携带上，后台不会存储您的 mob-token 具体详情参见
            <Link
              href="https://github.com/lujunji-xiaolu/mooc-helper"
              target="_blank"
            >
              Github 首页
            </Link>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="token"
            type="text"
            fullWidth
            variant="standard"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAddToken}>设置</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToken;

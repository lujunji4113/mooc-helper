import * as React from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Link from "@/components/Link";

import { useUpdateCourseList } from "@/features/course-drawer/recoil";
import { useSetMessage } from "@/features/message";

import axios from "axios";

const AddCourse: React.FC = () => {
  const [termId, setTermId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const updateCourseList = useUpdateCourseList();
  const setMessage = useSetMessage();

  const handleClose = () => {
    setTermId("");
    setOpen(false);
  };

  const handleAddCourse = async () => {
    if (termId.trim()) {
      const res = await axios({
        method: "GET",
        url: "https://qckftx.api.cloudendpoint.cn/addCourse",
        params: {
          tid: termId.trim(),
        },
      });
      if (res.data.status.code === 0) {
        updateCourseList();
        setMessage("加入成功");
      } else {
        setMessage(res.data.status.message);
      }
      setOpen(false);
      setTermId("");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      handleAddCourse();
    }
  };

  return (
    <>
      <Tooltip title="添加课程" enterDelay={300}>
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon color="primary" fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加课程</DialogTitle>
        <DialogContent>
          <DialogContentText>
            添加课程需要课程的ID，具体详情参见
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
            label="课程ID"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => setTermId(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAddCourse}>添加</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCourse;

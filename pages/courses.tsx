import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import ErrorSnackbar from "../components/ErrorSnackbar";
import Loading from "../components/Loading";
import CourseCard from "../components/courses/CouseCard";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export interface Course {
  currentTermId: string;
  imgUrl: string;
  name: string;
  schoolName: string;
}

const fetcher = async (url: string) => {
  const res = await axios({
    method: "GET",
    url,
  });
  return res.data.results.result.map((course: any) => ({
    currentTermId: course.currentTermId,
    imgUrl: course.imgUrl,
    name: course.name,
    schoolName: course.schoolPanel.name,
  }));
};

const Courses: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tid, setTid] = useState("");
  const [msg, setMsg] = useState("");
  const { data, error } = useSWR(
    "https://qckftx.api.cloudendpoint.cn/getAllCourses",
    fetcher
  );
  const { mutate } = useSWRConfig();

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setTid(event.target.value);
  };

  const handleClose = () => {
    setTid("");
    setOpen(false);
  };

  const handleCloseSnackbar = () => setMsg("");

  const handleClickOpen = () => setOpen(true);

  const handleAddCourse = async () => {
    if (tid.trim()) {
      const res = await axios({
        method: "GET",
        url: "https://qckftx.api.cloudendpoint.cn/addCourse",
        params: {
          tid: tid.trim(),
        },
      });
      if (res.data.status.code !== 0) {
        setMsg(res.data.status.message);
      } else {
        setMsg("加入成功");
        mutate("https://qckftx.api.cloudendpoint.cn/getAllCourses");
      }
      setOpen(false);
      setTid("");
    } else {
      setOpen(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      handleAddCourse();
    }
  };

  const renderCoursesInfo = () => {
    return (data as Course[]).map((course) => (
      <CourseCard key={course.currentTermId} course={course} />
    ));
  };

  if (error) return <ErrorSnackbar error={error} />;
  if (!data) return <Loading />;
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          my: 1,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          添加课程
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {renderCoursesInfo()}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加课程</DialogTitle>
        <DialogContent>
          <DialogContentText>
            添加课程需要课程的tid，具体详情参见
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="tid"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAddCourse}>添加</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={msg !== ""}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={msg}
      />
    </Container>
  );
};

export default Courses;

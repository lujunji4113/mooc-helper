import * as React from "react";
import Input from "@mui/material/Input";
import { getAllMyCourseList } from "@/api";
import { PSIZE } from "@/constants";
import { useSetRecoilState } from "recoil";
import {
  countState,
  courseListState,
  recentCourseListState,
} from "@/features/course";
import { messageState } from "@/features/message";

export default function MobToken() {
  const [value, setValue] = React.useState("");
  const setCount = useSetRecoilState(countState);
  const setCourseList = useSetRecoilState(courseListState);
  const setRecentCourseList = useSetRecoilState(recentCourseListState);
  const setMessage = useSetRecoilState(messageState);

  const changeValue: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (ev) => {
    setValue(ev.target.value);
    localStorage.setItem("mob-token", ev.target.value);
  };

  const handleTokenChange = async () => {
    try {
      const { status, results } = await getAllMyCourseList(1, PSIZE);
      if (status.code === 0) {
        setCount(results.pagination.totlePageCount);
        setCourseList(results.result);
        setRecentCourseList(results.result);
      } else {
        setMessage({
          show: true,
          msg: status.message,
        });
      }
    } catch (error) {
      setMessage({
        show: true,
        msg: String(error),
      });
    }
  };

  React.useEffect(() => {
    setValue(localStorage.getItem("mob-token") ?? "");
  }, []);

  return (
    <Input
      value={value}
      fullWidth
      onChange={changeValue}
      onBlur={handleTokenChange}
    />
  );
}

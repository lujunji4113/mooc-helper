import * as React from "react";
import Input from "@mui/material/Input";
import { courseList as getCourseList } from "@/api";
import { PAGE_SIZE } from "@/constants";
import { useSetRecoilState } from "recoil";
import {
  countState,
  courseListState,
  recentCourseListState,
} from "@/features/course";
import { messageState } from "@/features/message";
import store from "@/lib/store";

export default function MobToken() {
  const [value, setValue] = React.useState("");
  const setCount = useSetRecoilState(countState);
  const setCourseList = useSetRecoilState(courseListState);
  const setRecentCourseList = useSetRecoilState(recentCourseListState);
  const setMessage = useSetRecoilState(messageState);

  const changeValue: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = async (ev) => {
    setValue(ev.target.value);
  };

  const handleTokenChange = async () => {
    try {
      await store.set("mob-token", value);
      const { status, results } = await getCourseList(1, PAGE_SIZE);
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
    store.get("mob-token").then((storedMobToken) => {
      setValue(storedMobToken ?? "");
    });
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

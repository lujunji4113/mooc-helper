import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { atom, useRecoilState } from "recoil";

export const messageState = atom({
  key: "messageState",
  default: { show: false, msg: "" },
});

export const Message: React.FC = () => {
  const [message, setMessage] = useRecoilState(messageState);

  const closeMessage = React.useCallback(
    (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setMessage({ show: false, msg: "" });
    },
    [setMessage]
  );

  return (
    <Snackbar
      open={message.show}
      autoHideDuration={3000}
      onClose={closeMessage}
      message={message.msg}
    />
  );
};

import Snackbar from "@mui/material/Snackbar";
import { useMessageState } from "./recoil";

const Message: React.FC = () => {
  const [message, setMessage] = useMessageState();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage("");
  };

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
    />
  );
};

export default Message;

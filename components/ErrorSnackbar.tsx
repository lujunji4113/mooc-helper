import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";

interface ErrorSnackbarProps {
  error: any;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ error }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={String(error)}
    />
  );
};

export default ErrorSnackbar;

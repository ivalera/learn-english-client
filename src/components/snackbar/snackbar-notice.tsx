import { Snackbar, Alert } from "@mui/material";

type SnackbarProps = {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
};

const SnackbarNotice = ({
  open,
  message,
  severity,
  onClose,
}: SnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotice;

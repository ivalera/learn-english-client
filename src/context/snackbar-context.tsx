import React, { createContext, useState, useCallback } from "react";
import SnackbarComponent from "../components/snackbar/snackbar-notice";

type SnackbarProps = {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
};

export type SnackbarContextType = {
  showSnackbar: (message: string, severity: "success" | "error") => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps | null>(
    null,
  );

  const showSnackbar = useCallback(
    (message: string, severity: "success" | "error") => {
      setSnackbarProps({
        open: true,
        message,
        severity,
        onClose: () => setSnackbarProps(null),
      });
    },
    [],
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbarProps && (
        <SnackbarComponent
          open={snackbarProps.open}
          message={snackbarProps.message}
          severity={snackbarProps.severity}
          onClose={snackbarProps.onClose}
        />
      )}
    </SnackbarContext.Provider>
  );
};

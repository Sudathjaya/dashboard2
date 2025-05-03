import { Alert } from "@mui/material";
import React from "react";

export default function ErrorAlert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <Alert severity="error" onClose={onClose}>
      {message}
    </Alert>
  );
}

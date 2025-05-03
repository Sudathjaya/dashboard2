import { Alert } from "@mui/material";
import React from "react";

export default function SuccessAlert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <Alert severity="success" onClose={onClose}>
      {message}
    </Alert>
  );
}

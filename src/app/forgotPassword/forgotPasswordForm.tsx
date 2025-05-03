"use client";
import { z } from "zod";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { forgotPw } from "@/services/authService";
import { ErrorComponent } from "@/common/common";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ERROR_MESSAGES,
  MESSAGES,
  ROUTE_ENDPOINT,
  STRINGS,
} from "../../../public/const";
import { isValidSeverity } from "@/types/severity";

type Severity = "error" | "warning" | "info" | "success";

const styles = {
  formContainer: { width: "80%", textAlign: "center", marginBottom: "4rem" },
  errorMessage: {
    fontFamily: "Poppins",
    fontWeight: 300,
    fontSize: "15px",
    lineHeight: "30px",
    color: "#F75F56",
  },
  textField: { marginBottom: "1.8rem" },
  buttonBox: { display: "flex", justifyContent: "flex-end", width: "100%" },
  cusTitle: {
    fontSize: {
      xs: "1.7rem",
      sm: "1.9rem",
      md: "2rem",
      lg: "2.5rem",
    },
  },
};

const DEFAULT_ALERT = {
  message: "",
  show: false,
  severity: "error" as Severity,
};

interface FormValues {
  email: string;
}

const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.INVALID_EMAIL),
});

const ForgotPasswordForm = () => {
  const [alert, setAlert] = useState(DEFAULT_ALERT);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const clearAlert = () => setAlert(DEFAULT_ALERT);

  const submit = async (values: FormValues) => {
    try {
      const result = await forgotPw({ email: values.email });
      setAlert({
        message: result.error
          ? ERROR_MESSAGES.EMAIL_SENT_FAILED
          : MESSAGES.EMAIL_SENT_SUCCESS,
        show: true,
        severity: result.error ? "error" : "success",
      });

      if (!result.error) {
        setTimeout(
          () => router.push(ROUTE_ENDPOINT.FORGOT_PASSWORD_CONFIRM),
          3000,
        );
      }
    } catch (error) {
      setAlert({
        message:
          error instanceof Error
            ? ERROR_MESSAGES.EMAIL_SENT_FAILED
            : ERROR_MESSAGES.UNKNOWN_ERROR,
        show: true,
        severity: "error",
      });
    }
  };

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="subtitle2" sx={styles.cusTitle}>
        {STRINGS.RESET_PASSWORD}
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        {alert.show && alert.message === ERROR_MESSAGES.EMAIL_SENT_FAILED && (
          <Typography sx={styles.errorMessage}>
            {ERROR_MESSAGES.NOT_FOUND_EMAIL}
          </Typography>
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Please enter your account email"
              variant="outlined"
              fullWidth
              margin="dense"
              error={!!errors.email}
              helperText={
                errors.email && (
                  <ErrorComponent error={errors.email.message || ""} />
                )
              }
              sx={styles.textField}
            />
          )}
        />
        <Box sx={styles.buttonBox}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ width: 100, mt: 2 }}
            disabled={!isDirty || !isValid}
            size="large"
          >
            {STRINGS.NEXT}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        onClose={clearAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={isValidSeverity(alert.severity) ? alert.severity : "error"}
          onClose={clearAlert}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPasswordForm;

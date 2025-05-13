import { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import {
  Checkbox,
  Typography,
  IconButton,
  Button,
  Box,
  InputAdornment,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { ErrorComponent } from "@/common/common";
import { isValidSeverity } from "@/types/severity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  ERROR_MESSAGES,
  ROUTE_ENDPOINT,
  STRINGS,
  TEXTS,
} from "../../../public/const";
import { useAuth } from "@/context/AuthContext";

type Severity = "error" | "warning" | "info" | "success";

const styles = {
  formContainer: {
    width: "80%",
    textAlign: "center",
    marginBottom: "4rem",
  },
  cusSubtitle: {
    fontSize: {
      xs: "0.9rem",
      sm: "1rem",
      md: "1.1rem",
      lg: "1.2rem",
    },
    borderBottom: "1px solid #23AFC4",
    cursor: "pointer",
  },
  cusSubtitle2: {
    fontSize: {
      xs: "0.9rem",
      sm: "1rem",
      md: "1.1rem",
      lg: "1.2rem",
    },
  },
  cusBox1: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    alignItems: "center",
  },
  cusBox2: {
    display: "flex",
    alignItems: "center",
  },
  cusTextField: {
    marginBottom: "0.8rem",
    "& .MuiOutlinedInput-root": {
      height: '46px'
    },
  },
  cusAlert: {
    marginBottom: "20px",
  },
  errorIcon: {
    marginRight: 1,
    fontSize: 16,
    color: "red",
  },
};

interface FormValues {
  email: string;
  password: string;
}

const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.INVALID_EMAIL),
  password: z.string().min(1, ERROR_MESSAGES.PASSWORD_REQUIRED),
});

const LoginForm = () => {
  const { status } = useSession();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    message: string | null;
    show: boolean;
    severity: string | Severity;
  }>({ message: null, show: false, severity: "error" });
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
      password: "",
    },
  });
  const { logout } = useAuth();

  useEffect(() => {
    const handleSignOutIfLoggedIn = async () => {
      if (status === TEXTS.AUTHENTICATED && !isLoggingIn) {
        logout();
        await signOut({ redirect: false });
      }
    };

    handleSignOutIfLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isLoggingIn]);

  const clearAlert = () => {
    setAlert({ message: null, show: false, severity: "error" });
  };

  const submit: SubmitHandler<FormValues> = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setAlert({
          message: result.error,
          show: true,
          severity: "error",
        });
      } else if (result?.ok) {
        setIsLoggingIn(true);
        router.push(ROUTE_ENDPOINT.DASHBOARD);
      }
    } catch (error: unknown) {
      const errorMessage: string =
        error instanceof Error ? error.message : String(error);
      setAlert({
        message: errorMessage,
        show: true,
        severity: "error",
      });
    }
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="subtitle2">{STRINGS.SIGN_IN}</Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              margin="dense"
              error={!!errors.email}
              helperText={
                errors.email ? (
                  <ErrorComponent error={errors.email.message || ""} />
                ) : (
                  ""
                )
              }
              sx={styles.cusTextField}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              fullWidth
              margin="dense"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={
                errors.password ? (
                  <ErrorComponent error={errors.password.message || ""} />
                ) : (
                  ""
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowPassword}
                    >
                      <Image
                        src={`/images/svg/${showPassword ? "visibilityIcon" : "visibilityOff"}.svg`}
                        width={20}
                        height={20}
                        alt={showPassword ? "Hide password" : "Show password"}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.cusTextField}
            />
          )}
        />
        <Box sx={styles.cusBox1}>
          <Box sx={styles.cusBox2}>
            <Checkbox />
            <Typography variant="subtitle1" sx={styles.cusSubtitle2}>
              {STRINGS.STAY_LOGGED_IN}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={styles.cusSubtitle}
            onClick={() => router.push("/forgotPassword")}
          >
            {STRINGS.FORGOT_PASSWORD}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
          size="large"
        >
          {STRINGS.SIGN_IN}
        </Button>
      </form>

      {alert.show && alert.message && (
        <Alert
          severity={isValidSeverity(alert.severity) ? alert.severity : "error"}
          sx={styles.cusAlert}
          onClose={clearAlert}
        >
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};

export default LoginForm;

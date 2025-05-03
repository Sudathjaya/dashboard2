"use client";
import { Button, Grid2, TextField, Typography, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { getContactUsToken, postContactUs } from "@/services/contact-us";
import ErrorAlert from "@/common/error-alert";
import { useState } from "react";
import SuccessAlert from "@/common/success-alert";
import { ERROR_MESSAGES } from "@/public/const";

const NAME_REQUIRED = "Name is required";
const MESSAGE_REQUIRED = "Message is required";
const SUBJECT_REQUIRED = "Subject is required";

export type ContactUsFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type AlertState = {
  message: string | null;
  show: boolean;
  severity: "error" | "warning" | "info" | "success";
};

const validationSchema = z.object({
  name: z.string().min(1, NAME_REQUIRED),
  email: z.string().email(ERROR_MESSAGES.INVALID_EMAIL),
  subject: z.string().min(1, SUBJECT_REQUIRED),
  message: z.string().min(1, MESSAGE_REQUIRED),
});

export default function ContactUsPage() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ContactUsFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const [alert, setAlert] = useState<AlertState>({
    message: null,
    show: false,
    severity: "error",
  });

  const onSubmit = async (data: ContactUsFormValues) => {
    try {
      const token = await getContactUsToken();
      const message = await postContactUs({ ...data, token });
      reset();
      setAlert({ message, show: true, severity: "success" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAlert({ message: error.message, show: true, severity: "error" });
      } else {
        setAlert({
          message: "An error occurred",
          show: true,
          severity: "error",
        });
      }
    }
  };

  const resetAlert = () => {
    setAlert({ message: null, show: false, severity: "error" });
  };

  return (
    <Grid2 container justifyContent="center">
      <Grid2 size={{ md: 4, xs: 11, sm: 11 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "medium",
            fontSize: "40px",
            paddingY: "25px",
            textAlign: "center",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, fontSize: 14, textAlign: "center" }}
        >
          Need help with the dashboard? Please let us know your needs.
        </Typography>
        <Box sx={{ mt: "40px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  id="name"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Subject (optional)"
                  id="subject"
                  {...field}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Message"
                  id="message"
                  {...field}
                  error={!!errors.message}
                  helperText={errors.message ? errors.message.message : ""}
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ width: "100%", fontWeight: "thin" }}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Box sx={{ mt: "40px" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: 16, textAlign: "center" }}
          >
            Company details:
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: 16, textAlign: "center" }}
          >
            2231 Crystal Drive #204, Arlington, VA 22202
          </Typography>
        </Box>
        {alert.show && alert.severity === "error" && alert.message && (
          <ErrorAlert message={alert.message} onClose={resetAlert} />
        )}
        {alert.show && alert.severity === "success" && alert.message && (
          <SuccessAlert message={alert.message} onClose={resetAlert} />
        )}
      </Grid2>
    </Grid2>
  );
}

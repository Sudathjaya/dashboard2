import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  DialogContent,
  Snackbar,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import * as z from "zod";
import TextField from "@mui/material/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import DropFileInput from "./dropImage";
import AccountModalAdmin from "./accountModalAdmin";
import Dialog from "@mui/material/Dialog";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { TEXTS } from "@/public/const";
import { userUpdate } from "@/services/notificationService";
import { AccountModalProps } from "@/types/interfaces";
import Grid from "@mui/material/Grid2";

const style = {
  chip: {
    fontFamily: "Poppins",
    backgroundColor: "#ECF9F7",
    border: "2px solid",
    borderColor: "#0F9BB0",
    fontWeight: "400",
    color: "#000000",
    fontSize: "0.8rem",
    margin: "0.4rem",
    padding: "0.5rem 0.5rem 0.5rem 0.5rem",
    lineHeight: "1rem",
  },
};

interface AlertState {
  showAlert: boolean;
  severity: "success" | "error";
  message: string;
}
interface InitialValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  url: string;
}
interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  url: string;
}

const AccountModal = ({
  setOpen,
  open,
  setOpenedPassword,
  setOpenAuthentication,
}: AccountModalProps) => {
  const { data: session, status } = useSession();
  const [edit, setEdit] = useState(false);
  const [initialValues, setInitialValues] = useState<InitialValues>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    url: "",
  });

  const [teams, setTeams] = useState<any>([]);
  const [alert, setAlert] = useState<AlertState>({
    showAlert: false,
    severity: "success",
    message: "",
  });

  const { user } = useAuth();
  const role = user?.role;

  const AccountSchema = z.object({
    first_name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(15, { message: "First name must be at most 15 characters" }),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(15, "Last name must be at most 15 characters"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(AccountSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [open]);

  const onFileChange = async () => {
    loadData();
  };

  const loadData = async () => {
    try {
      if (user) {
        setInitialValues({
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          email: user?.email || "",
          password: "hiddenPassword",
          url: user?.avatar_url || "",
        });
        if (user?.groups) {
          setTeams(user.groups);
        }
        setEdit(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response?.data) {
        setAlert({
          showAlert: true,
          severity: "error",
          message: error.response?.data?.message,
        });
      } else {
        setAlert({
          showAlert: true,
          severity: "error",
          message: "Something was wrong!",
        });
      }
    }
  };

  const submit = async (e: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await userUpdate(session?.user?.accessToken, {
          first_name: e.first_name,
          last_name: e.last_name,
        });
        setEdit(true);
        setAlert({
          showAlert: true,
          severity: "success",
          message: "User updated Successfully!",
        });
        setTimeout(() => {
          setAlert({
            showAlert: false,
            severity: "success",
            message: "User updated Successfully!",
          });
        }, 5000);
      }
    } catch (error: any) {
      if (error.response && error.response?.data) {
        setAlert({
          showAlert: true,
          severity: "error",
          message: error.response?.data?.message,
        });
      } else {
        setAlert({
          showAlert: true,
          severity: "error",
          message: "Something was wrong!",
        });
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogContent style={{ margin: "0 2rem 0 2rem" }}>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container>
            <Grid size={{ md: 12, xs: 12, sm: 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(false)}
                />
              </Box>
            </Grid>
            <Grid size={{ md: 12, xs: 12, sm: 12 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="subtitle2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "30px",
                    margin: "10px",
                  }}
                >
                  Account
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1.5rem 0",
                }}
              >
                <Avatar
                  alt="user profile picture"
                  src={initialValues.url}
                  sx={{ width: 90, height: 90 }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "-1.5rem 0 1rem 0",
                }}
              >
                <DropFileInput onFileChange={() => onFileChange()} />
              </Box>
            </Grid>
            <Grid container spacing={1} alignItems="center">
              <Grid
                size={{ md: 5, xs: 12, sm: 5 }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue={initialValues.first_name}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.first_name}
                      sx={{
                        height: "40px",
                        minWidth: "200px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                          width: "97%",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.85rem", // Change font size of input text
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.85rem", // Change font size of placeholder (label)
                        },
                      }}
                      disabled={edit}
                    />
                  )}
                />
              </Grid>

              {/* Last Name Field */}
              <Grid
                size={{ md: 5, xs: 12, sm: 5 }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Controller
                  name="last_name"
                  control={control}
                  defaultValue={initialValues.last_name}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      variant="outlined"
                      // fullWidth
                      error={!!errors.last_name}
                      sx={{
                        height: "40px",
                        minWidth: "200px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                          width: "97%",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.85rem", // Change font size of input text
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.85rem", // Change font size of placeholder (label)
                        },
                      }}
                      disabled={edit}
                    />
                  )}
                />
              </Grid>

              <Grid
                size={{ md: 2, xs: 12, sm: 2 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {edit ? (
                  <Button
                    fullWidth
                    size="medium"
                    onClick={() => setEdit(false)}
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      width: 85,
                      height: "40px",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      color: "#0F9BB0",
                      textTransform: "none",
                      border: "2px solid #0F9BB0",
                      "&:hover": {
                        backgroundColor: "#E6F7F9",
                      },
                    }}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    size="medium"
                    type="submit"
                    disabled={!isValid}
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      width: 85,
                      height: "40px",
                      borderRadius: "4px",
                      backgroundColor: "#0F9BB0",
                      color: "white",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#0C859A",
                      },
                    }}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid size={{ md: 12, xs: 12, sm: 12 }}>
              <Typography
                variant="h2"
                style={{
                  fontSize: "0.8rem",
                  marginBottom: "-0.5rem",
                  lineHeight: "30px",
                  color: "#0F9BB0",
                  textDecoration: "underline",
                  textAlign: "end",
                  cursor: "pointer",
                }}
                onClick={() => setOpenAuthentication(true)}
              >
                {role === "COACH" ? "Request to change" : "Change"}
              </Typography>
              <Controller
                name="email"
                control={control}
                defaultValue={initialValues.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    error={!!errors.email}
                    sx={{
                      minWidth: "100%",
                      flexGrow: 1,
                      "& .MuiInputBase-root": {
                        height: "40px",
                        width: "100%",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "0.85rem",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "0.85rem",
                      },
                    }}
                    value={field.value}
                    disabled
                  />
                )}
              />
            </Grid>
            <Grid size={{ md: 12, xs: 12, sm: 12 }}>
              <Typography
                variant="h2"
                style={{
                  fontSize: "0.8rem",
                  marginBottom: "-0.5rem",
                  lineHeight: "30px",
                  color: "#0F9BB0",
                  textDecoration: "underline",
                  textAlign: "end",
                  cursor: "pointer",
                }}
                onClick={() => setOpenedPassword(true)}
              >
                Change
              </Typography>
              <Controller
                name="password"
                control={control}
                defaultValue={initialValues.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    // fullWidth
                    margin="dense"
                    type={"password"}
                    error={!!errors.password}
                    sx={{
                      minWidth: "100%",
                      flexGrow: 1,
                      "& .MuiInputBase-root": {
                        height: "40px",
                        width: "100%",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "0.85rem", // Change font size of input text
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "0.85rem", // Change font size of placeholder (label)
                      },
                    }}
                    value={field.value}
                    disabled
                  />
                )}
              />
            </Grid>
            {role === "COACH" ? (
              <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                <Typography
                  variant="h3"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "30px",
                    textAlign: "start",
                  }}
                >
                  Teams
                </Typography>
                <Box
                  sx={{
                    width: "30.5rem",
                    height: "11rem",
                    overflowY: "auto",
                    overflowX: "none",
                  }}
                >
                  {teams.map((item: any, idx: any) => {
                    return (
                      <Chip
                        label={item.name}
                        sx={style.chip}
                        size="small"
                        key={idx}
                      />
                    );
                  })}
                </Box>
              </Grid>
            ) : (
              <AccountModalAdmin />
            )}
          </Grid>
          <Grid size={{ md: 12, xs: 12, sm: 12 }}>
            {alert.showAlert ? (
              <Snackbar
                onClose={() =>
                  setAlert({
                    ...alert,
                    showAlert: false,
                  })
                }
              >
                <Alert
                  severity={alert.severity}
                  onClose={() =>
                    setAlert({
                      ...alert,
                      showAlert: false,
                    })
                  }
                >
                  {alert.message}
                </Alert>
              </Snackbar>
            ) : null}
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal;

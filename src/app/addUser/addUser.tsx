import React, { useState } from "react";
import {
  Box,
  TextField,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Autocomplete,
  styled,
  Typography,
  Button,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useSession } from "next-auth/react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { TEXTS } from "@/public/const";
import { inviteTeam } from "@/services/teamService";
import { AddUserModalProps } from "@/types/interfaces";

const StyledTextField = styled(TextField)(() => ({
  "& label.Mui-focused": {
    color: "#0F9BB0",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#0F9BB0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0F9BB0",
    },
    "&:hover fieldset": {
      borderColor: "#0F9BB0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0F9BB0",
    },
  },
  "& .MuiFormLabel-root.Mui-error": {
    color: "gray !important",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "red !important",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
    color: "black",
  },
}));

const styles = {
  headerText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: "4rem",
    textAlign: "center",
    color: "#313131",
  },
  searchButton: {
    width: "117px",
    height: "auto",
    background: "#23AFC4",
    margin: "0",
    marginLeft: "4px",
    opacity: 1,
    borderRadius: "4px",
    border: "none",
    color: "white",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    cursor: "pointer",
    textTransform: "capitalize",
  },
  descriptionText: {
    fontFamily: "'Poppins'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.87rem",
    lineHeight: "1.25rem",
    padding: "0rem 2rem 2rem 3rem",
    color: "#adadad",
    marginTop: "10px",
  },
  disabled: {
    width: "117px",
    height: "auto",
    background: "#0F9BB0",
    margin: "0",
    marginLeft: "4px",
    opacity: "0.5",
    border: "none",
    color: "white",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    cursor: "pointer",
    textTransform: "capitalize",
  },
  emailChip: {
    display: "flex",
    alignItems: "center",
    margin: "5px 11px",
    borderRadius: "6px",
    background: "#ecf9f7 0% 0% no-repeat padding-box",
    color: "#000000",
  },
  errorChip: {
    display: "flex",
    alignItems: "center",
    margin: "5px 11px",
    background: "white",
    color: "#000000",
    border: "1px solid red",
    borderRadius: "6px",
  },
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface BootstrapDialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle: React.FC<BootstrapDialogTitleProps> = ({
  children,
  onClose,
  ...other
}): React.ReactElement => (
  <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
    {children}
    {onClose ? (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 32,
          top: 20,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    ) : null}
  </DialogTitle>
);

const AddUser = ({ openDevices, setOpenDevices }: AddUserModalProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const [emails, setEmails] = useState<string[]>([]);
  const [emailsValidation, setEmailsValidation] = useState<boolean[]>([]);
  const { data: session, status } = useSession();
  const [alert, setAlert] = useState<{
    showAlert: boolean;
    severity: "success" | "error";
    message: string;
  }>({
    showAlert: false,
    severity: "success",
    message: "",
  });

  const handleClickOpen = () => setOpenDevices(true);
  const handleClose = () => setOpenDevices(false);

  const addEmails = (arr: string[]) => {
    const testArray = arr.map(checkEmail);
    setEmails(arr);
    setEmailsValidation(testArray);
  };

  const sendInvite = async () => {
    if (emails.length === 0) {
      showAlert(
        "error",
        "Please enter an email address and press ENTER to invite.",
      );
      return;
    }

    for (const item of emails) {
      try {
        if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
          await inviteTeam(session?.user?.accessToken, { email: item });
          showAlert("success", "Sent invite Successfully!");
          setTimeout(() => {
            setAlert({ showAlert: false, severity: "success", message: "" });
            handleClose();
          }, 5000);
        }
      } catch (error: any) {
        const status = error?.response?.status;
        const message =
          status === 401
            ? "Invalid Authentication!"
            : status === 404
              ? "User not found.!"
              : status === 400
                ? "Invalid email!"
                : "Server error!";
        showAlert("error", message);
      }
    }
  };

  const showAlert = (severity: "success" | "error", message: string) => {
    setAlert({ showAlert: true, severity, message });
    setTimeout(
      () => setAlert({ showAlert: false, severity, message: "" }),
      5000,
    );
  };

  const checkEmail = (address: string): boolean => {
    const regex =
      /([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/;
    return regex.test(address);
  };

  return (
    <Box>
      <Box
        style={{ display: "flex", alignItems: "center" }}
        onClick={handleClickOpen}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
        >
          <Image
            src="/images/svg/addDevice.svg"
            alt="PoweredBy"
            width={52}
            height={10}
          />
        </Box>
      </Box>

      <BootstrapDialog
        maxWidth="lg"
        fullWidth
        onClose={handleClose}
        open={openDevices}
      >
        <BootstrapDialogTitle onClose={handleClose} />
        <DialogContent>
          <Typography sx={styles.headerText}>Invite Players</Typography>
          <Box sx={{ display: "flex", padding: "0 2rem" }}>
            <Box style={{ width: isMobile ? "80%" : "90%" }}>
              <Autocomplete
                multiple
                freeSolo
                fullWidth
                value={emails}
                onChange={(event: any, newValue: readonly string[]) =>
                  addEmails(newValue as string[])
                }
                options={[]}
                getOptionLabel={(option) => option}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option, index) => (
                    <React.Fragment key={index}>
                      {checkEmail(option) ? (
                        <Box sx={styles.emailChip}>
                          <Chip
                            style={{
                              fontFamily: "Poppins",
                              background: "#ECF9F7",
                              color: "#000",
                              fontSize: "1rem",
                              height: "2rem",
                            }}
                            size="small"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        </Box>
                      ) : (
                        <Box sx={styles.errorChip}>
                          <Chip
                            style={{
                              fontFamily: "Poppins",
                              background: "#fff",
                              color: "#000",
                              fontSize: "1rem",
                              height: "1.5rem",
                            }}
                            size="small"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        </Box>
                      )}
                    </React.Fragment>
                  ))
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    placeholder={
                      params && !emails.length
                        ? "Insert email to add players, divide by enter"
                        : ""
                    }
                  />
                )}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              disabled={
                !(emails.length > 0 && !emailsValidation.includes(false))
              }
              onClick={() =>
                emails.length > 0 && !emailsValidation.includes(false)
                  ? sendInvite()
                  : null
              }
              sx={
                emails.length > 0 && !emailsValidation.includes(false)
                  ? styles.searchButton
                  : styles.disabled
              }
            >
              Send Invite
            </Button>
          </Box>
          {alert.showAlert && (
            <Box style={{ padding: "0.5rem 2rem" }}>
              <Alert
                severity={alert.severity}
                onClose={() => setAlert({ ...alert, showAlert: false })}
              >
                {alert.message}
              </Alert>
            </Box>
          )}

          <Typography sx={styles.descriptionText}>
            Go to Players tab to remove players/check their status.
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default AddUser;

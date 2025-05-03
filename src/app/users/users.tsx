import React, { useState, useEffect } from "react";
import { TEXTS } from "@/public/const";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import DeleteUserModal from "./deleteUserModal";
import { getTeamAdmins, userInvite } from "@/services/userService";
import {
  Autocomplete,
  TextField,
  Chip,
  Snackbar,
  Box,
  Alert,
  Typography,
  Button,
  styled,
  useMediaQuery,
  Theme,
} from "@mui/material";

const DEFAULT_ALERT = {
  message: "",
  show: false,
  severity: "success" as Severity,
};

type Severity = "error" | "warning" | "info" | "success";

// Styled components using MUI v6 approach
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
    fontWeight: 600,
    fontSize: "2rem",
    lineHeight: "4rem",
    textAlign: "center",
    paddingTop: "5rem",
    color: "#313131",
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
    background: "white",
    border: "1px solid red",
    display: "flex",
    alignItems: "center",
    margin: "5px 11px",
    borderRadius: "6px",
    color: "#000000",
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
  descriptionTittle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.87rem",
    lineHeight: "1.87rem",
    padding: 0,
    margin: 0,
    color: "#adadad",
  },
  emailPara: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.87rem",
    lineHeight: "1.87rem",
    marginTop: "0.81rem",
    marginBottom: "0.81rem",
    color: "#000000",
  },
  emailDelete: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.87rem",
    lineHeight: "1.87rem",
    marginTop: "0.81rem",
    marginBottom: "0.81rem",
    cursor: "pointer",
    color: "#23AFC4",
  },
};

const Users: React.FC = () => {
  const { data: session, status } = useSession();
  const { user } = useAuth();
  const role = user?.role;
  const [emails, setEmails] = useState([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [opened, setOpened] = useState(false);
  const [id, setID] = useState("");
  const [emailsValidation, setEmailsValidation] = useState<any>([]);
  const [alert, setAlert] = useState(DEFAULT_ALERT);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  const addEmails = (arr: any) => {
    const testArray: boolean[] = [];
    setEmails(arr);
    arr.map((item: string) => {
      const result = checkEmail(item);
      if (result) {
        return testArray.push(true);
      } else {
        return testArray.push(false);
      }
    });
    setEmailsValidation(testArray);
  };

  const sendInvite = () => {
    if (emails.length === 0) {
      setAlert({
        show: true,
        severity: "error",
        message: "Please enter an email address and press ENTER to invite.",
      });
      return;
    }
    emails.map(async (item) => {
      try {
        if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
          await userInvite(session?.user?.accessToken, { email: item });

          // Update the UI without reloading
          setAdmins((prev) => [...prev, { email: item }]);
          setEmails([]); // Clear the input field

          setAlert({
            show: true,
            severity: "success",
            message: "Sent invite Successfully!",
          });
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          setAlert({
            show: true,
            severity: "error",
            message: "Invalid Authentication!",
          });
        } else if (error.response?.status === 404) {
          setAlert({
            show: true,
            severity: "error",
            message: "User not found.!",
          });
        } else if (error.response?.status === 400) {
          setAlert({
            show: true,
            severity: "error",
            message: "User with email address already exists.",
          });
        } else {
          setAlert({
            show: true,
            severity: "error",
            message: "Server error!",
          });
        }
      }
    });
  };

  const checkEmail = (email: unknown): boolean => {
    return (
      typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
  };

  const loadData = async () => {
    if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      const { data } = await getTeamAdmins(session?.user?.accessToken);
      if (data.data) {
        setAdmins(data.data);
      }
    }
  };

  const handleDelete = (id: string) => {
    setID(id);
    setOpened(true);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setAlert({
      show: false,
      severity: "success",
      message: "",
    });
  };

  // const removeEmail = (index: number) => {
  //     setEmails((prev) => prev.filter((_, i) => i !== index));
  // };

  return (
    <Box>
      <Typography sx={styles.headerText}>
        Invite Your Dashboard Users
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0",
          marginTop: "80px",
        }}
      >
        <Box style={{ width: isMobile ? "80%" : "58%" }}>
          <Autocomplete
            multiple
            freeSolo
            fullWidth
            onChange={(event, newValue) => {
              addEmails(newValue);
            }}
            value={emails}
            options={[]}
            // getOptionLabel={(option) => option}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : ""
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                // Extract the key separately
                const { key, ...tagProps } = getTagProps({ index });

                return (
                  <React.Fragment key={key}>
                    {checkEmail(option) ? (
                      <Box sx={styles.emailChip}>
                        <Chip
                          key={key}
                          sx={{
                            fontFamily: "normal normal normal 12px Poppins",
                            letterSpacing: "0px",
                            background: "#ECF9F7 0% 0% no-repeat padding-box",
                            color: "#000000",
                            opacity: 1,
                            flexWrap: "wrap",
                            fontWeight: 400,
                            fontSize: "1rem",
                            lineHeight: "1.37rem",
                            height: "2rem",
                          }}
                          size="small"
                          label={option}
                          {...tagProps}
                        />
                      </Box>
                    ) : (
                      <Box sx={styles.errorChip}>
                        <Chip
                          key={key}
                          sx={{
                            fontFamily: "normal normal normal 12px Poppins",
                            letterSpacing: "0px",
                            background: "#ffffff 0% 0% no-repeat padding-box",
                            color: "#000000",
                            opacity: 1,
                            flexWrap: "wrap",
                            fontWeight: 400,
                            fontSize: "1rem",
                            lineHeight: "1.37rem",
                            height: "1.5rem",
                          }}
                          size="small"
                          label={option}
                          {...tagProps}
                        />
                      </Box>
                    )}
                  </React.Fragment>
                );
              })
            }
            renderInput={(params) => (
              <StyledTextField
                placeholder={
                  params && !emails.length
                    ? "Insert email to add dashboard users, divide by enter"
                    : ""
                }
                {...params}
              />
            )}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={!(emails.length > 0 && !emailsValidation.includes(false))}
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
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "0 2rem" }}
      >
        <Box
          sx={{
            width: "57%",
            marginTop: "1rem",
            marginBottom: "4rem",
            padding: "1.8rem",
            backgroundColor: "#E9F1F1",
          }}
        >
          <Box
            sx={{
              height: 500,
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
              boxSizing: "border-box",
              paddingRight: "30px",
              display: "block",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#aaa",
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <Typography sx={styles.descriptionTittle}>
              People who are invited will receive a link to create an account
              and be able to use the dashboard.{" "}
            </Typography>
            {admins.map((admin: any, index: any) => (
              <Box
                sx={{ display: "flex", justifyContent: "space-between" }}
                key={index}
              >
                <Typography sx={styles.emailPara}>{admin.email}</Typography>
                {role === "SUPER_ADMIN" && (
                  <Typography
                    sx={styles.emailDelete}
                    onClick={() => {
                      handleDelete(admin?.id);
                    }}
                  >
                    Delete
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: "117px", margin: "5px" }}></Box>
      </Box>
      <Snackbar
        open={alert.show}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alert.severity} onClose={handleClose}>
          {alert.message}
        </Alert>
      </Snackbar>
      <DeleteUserModal
        setOpen={setOpened}
        open={opened}
        id={id}
        setAlert={setAlert}
        loadData={loadData}
      />
    </Box>
  );
};

export default Users;

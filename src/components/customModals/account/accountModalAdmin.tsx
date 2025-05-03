import { useEffect, useState } from "react";
import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Image from "next/image";
import { TEXTS } from "@/public/const";
import { useSession } from "next-auth/react";
import Grid from "@mui/material/Grid2";
import {
  getActionsApprovals,
  getActionsList,
} from "@/services/notificationService";

const styles = {
  adminText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    color: "#000000",
    fontSize: "0.9rem",
    lineHeight: "30px",
  },
};
const AccountModalAdmin = () => {
  const { data: session, status } = useSession();
  const [request, setRequest] = useState<any>([]);
  const [alertSnack, setAlertSnack] = useState({
    showAlert: false,
    severity: "success" as "success" | "error",
    message: "",
  });
  const [acceptRequest, setAcceptRequest] = useState<any>([]);
  const [deniedRequest, setDeniedRequest] = useState<any>([]);
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await getActionsList(session?.user?.accessToken);
        setRequest(data?.data);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response?.data) {
        setAlertSnack({
          showAlert: true,
          severity: "error",
          message: error.response?.data?.message,
        });
      } else {
        setAlertSnack({
          showAlert: true,
          severity: "error",
          message: "Something was wrong!",
        });
      }
    }
  };

  const submitAccept = async (e: string) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getActionsApprovals(session?.user?.accessToken, e, true);
        setAlertSnack({
          showAlert: true,
          severity: "success",
          message: "Request accepted Successfully!",
        });
        setAcceptRequest((item: any) => [...item, e]);
      }
    } catch (error: any) {
      if (error.response && error.response?.data) {
        setAlertSnack({
          showAlert: true,
          severity: "error",
          message: error.response?.data?.message,
        });
      } else {
        setAlertSnack({
          showAlert: true,
          severity: "error",
          message: "Something was wrong!",
        });
      }
    }
  };

  const submitDecline = async (e: string) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getActionsApprovals(session?.user?.accessToken, e, false);
        setAlertSnack({
          showAlert: true,
          severity: "success",
          message: "Request decline Successfully!",
        });
        setDeniedRequest((item: any) => [...item, e]);
      }
    } catch (error: any) {
      if (error.response && error.response?.data) {
        setAlertSnack({
          showAlert: true,
          severity: "error",
          message: error.response?.data?.message,
        });
      } else {
        setAlertSnack({
          showAlert: true,
          severity: "error",
          message: "Something was wrong!",
        });
      }
    }
  };

  const handleClose = () => {
    setAlertSnack({
      showAlert: false,
      severity: "success",
      message: "",
    });
  };

  return (
    <Grid size={{ md: 12, xs: 12, sm: 12 }}>
      <Typography sx={styles.adminText}>Coach Email Request</Typography>
      <Box
        sx={{
          width: "30.5rem",
          height: "11rem",
          overflowY: "auto",
          overflowX: "none",
        }}
      >
        {request?.map((item: any, key: any) => {
          return (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              key={key}
            >
              <Grid size={{ md: 3, xs: 3, sm: 3 }}>
                <Typography
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item?.user?.first_name + " " + item?.user?.last_name}
                </Typography>
              </Grid>
              <Grid size={{ md: 5, xs: 5, sm: 5 }}>
                <Grid container alignItems="center" justifyContent="flex-start">
                  <Grid size={{ md: 2, xs: 2, sm: 2 }}>
                    <Grid
                      style={{
                        marginTop: "0.7rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Image
                          src="/images/svg/ArrowTag.svg"
                          alt="ArrowTag"
                          width="19"
                          height="20"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                    <Typography
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "0.8rem",
                        lineHeight: "30px",
                      }}
                    >
                      {item?.old_email}
                    </Typography>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "0.8rem",
                        lineHeight: "30px",
                      }}
                    >
                      {item?.new_email}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ md: 4, xs: 4, sm: 4 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  style={{ marginTop: "0.1rem", paddingRight: "0.5rem" }}
                >
                  {acceptRequest?.includes(item?.request_id) ? (
                    <Grid
                      size={{ md: 12, xs: 12, sm: 12, lg: 12 }}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Typography
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "1rem",
                        }}
                      >
                        Approved
                      </Typography>
                    </Grid>
                  ) : deniedRequest?.includes(item?.request_id) ? (
                    <Grid
                      size={{ md: 12, xs: 12, sm: 12, lg: 12 }}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Typography
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "1rem",
                        }}
                      >
                        Denied
                      </Typography>
                    </Grid>
                  ) : (
                    <>
                      <Grid
                        size={{ md: 6, xs: 6, sm: 6, lg: 6 }}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          fullWidth
                          size="large"
                          onClick={() => submitDecline(item?.request_id)}
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: "1.25rem",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontStyle: "normal",
                            width: 65,
                            height: 38,
                            backgroundColor: "white",
                            color: "#0F9BB0",
                            textTransform: "none",
                            border: "2px solid",
                            borderColor: "#0F9BB0",
                          }}
                        >
                          <CloseIcon />
                        </Button>
                      </Grid>
                      <Grid
                        size={{ md: 6, xs: 6, sm: 6, lg: 6 }}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          fullWidth
                          size="large"
                          onClick={() => submitAccept(item?.request_id)}
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: "1.25rem",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontStyle: "normal",
                            width: 65,
                            height: 38,
                            backgroundColor: "#0F9BB0",
                            color: "white",
                            textTransform: "none",
                          }}
                        >
                          <DoneIcon />
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Box>
      <Snackbar
        open={alertSnack.showAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alertSnack.severity} onClose={handleClose}>
          {alertSnack.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AccountModalAdmin;

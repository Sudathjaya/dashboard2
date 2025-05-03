import { useState } from "react";
import { Box, Alert, Chip, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Snackbar from "@mui/material/Snackbar";
import { useSession } from "next-auth/react";
import { TEXTS } from "@/public/const";
import { updateTeamRole } from "@/services/teamService";
import { AlertState } from "@/types/interfaces";

const styles = {
  titleText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "0.9rem",
    lineHeight: "1rem",
    color: "black",
    textAlign: "center",
  },
  boxCSSForAdmin: {
    width: "55.5rem",
    height: "30rem",
    overflowY: "auto",
    overflowX: "hidden", // "none" is not valid; should use "hidden"
  },
  titleTextData1: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#444444",
    textAlign: "center",
    marginBottom: "-0.5rem",
  },
  titleTextData2: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#444444",
    textAlign: "center",
  },
  titleTextData: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#444444",
    textAlign: "center",
  },
  titleTextOperation: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#0F9BB0",
    textAlign: "center",
    textDecoration: "underline",
    cursor: "pointer",
  },
  tittleTextData1: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#444444",
    textAlign: "center",
    marginBottom: "-0.5rem",
  },
  tittleText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "0.rem",
    lineHeight: "1rem",
    color: "black",
    textAlign: "center",
  },
  tittleTextData2: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#444444",
    textAlign: "center",
  },
  tittleTextData: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#444444",
    textAlign: "center",
  },
  tittleTextOperation: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.8rem",
    lineHeight: "1rem",
    color: "#0F9BB0",
    textAlign: "center",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const CoachManagementModalForAdmin = ({
  data,
  loadData,
  setDisplayMessage,
}: any) => {
  const { data: session, status } = useSession();
  const [alert, setAlert] = useState<AlertState>({
    showAlert: false,
    severity: "success",
    message: "",
  });

  const handleClose = () => {
    setAlert({
      showAlert: false,
      severity: "success",
      message: "",
    });
  };

  const submitAction = async (e: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await updateTeamRole(session?.user?.accessToken, {
          user_id: e?.id,
          role: e?.role === "COACH" ? "ADMIN" : "COACH",
        });
        if (data?.status === "OK") {
          setAlert({
            showAlert: true,
            severity: "success",
            message: data?.message,
          });
          /* eslint-disable @typescript-eslint/no-unused-expressions */
          e?.role === "COACH"
            ? setDisplayMessage({
                show: true,
                message: `${e.first_name} ${e.last_name} has been upgraded to Admin.`,
              })
            : setDisplayMessage({
                show: true,
                message: `${e.first_name} ${e.last_name} has been downgraded to Coach.`,
              });
        }
        loadData();
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
          message: "Something error!",
        });
      }
    }
  };

  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container style={{ width: "55.5rem" }}>
          <Grid
            size={{ md: 3, xs: 3, sm: 3 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography sx={styles.tittleText}>Name</Typography>
          </Grid>
          <Grid
            size={{ md: 4, xs: 4, sm: 4 }}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography sx={styles.tittleText}>Email</Typography>
          </Grid>
          <Grid
            size={{ md: 2, xs: 2, sm: 2 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography sx={styles.tittleText}>Level</Typography>
          </Grid>
          <Grid
            size={{ md: 3, xs: 3, sm: 3 }}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography sx={styles.tittleText}>Operation</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={styles.boxCSSForAdmin}>
          {data.map((item: any) => (
            <>
              <Grid container style={{ marginTop: "1rem" }}>
                <Grid
                  size={{ md: 1, xs: 1, sm: 1 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Rem_Sharp"
                    src={item.avatar_url}
                    sx={{ width: 35, height: 35 }}
                  />
                </Grid>
                <Grid
                  size={{ md: 2, xs: 2, sm: 2 }}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Grid container>
                    <Grid
                      size={{ md: 12, xs: 12, sm: 12 }}
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Typography sx={styles.tittleTextData1}>
                        {item?.first_name}
                      </Typography>
                    </Grid>
                    <Grid
                      size={{ md: 12, xs: 12, sm: 12 }}
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Typography sx={styles.tittleTextData2}>
                        {item?.last_name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ md: 4, xs: 4, sm: 4 }}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={styles.tittleTextData}>
                    {item?.email}
                  </Typography>
                </Grid>
                <Grid
                  size={{ md: 2, xs: 2, sm: 2 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item?.role === "COACH" ? (
                    <Typography sx={styles.tittleTextData}>Coach</Typography>
                  ) : (
                    <Chip
                      label={
                        item?.role === "SUPER_ADMIN"
                          ? "Super Admin"
                          : item?.role === "ADMIN"
                            ? "Admin"
                            : null
                      }
                      size="small"
                      style={{
                        backgroundColor: "#A6DCE5",
                        padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                      }}
                    />
                  )}
                </Grid>
                <Grid
                  size={{ md: 3, xs: 3, sm: 3 }}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {item?.role === "ADMIN" ? (
                    <Typography
                      sx={styles.tittleTextOperation}
                      onClick={() => submitAction(item)}
                    >
                      Downgrade to Coach
                    </Typography>
                  ) : item?.role === "COACH" ? (
                    <Typography
                      sx={styles.tittleTextOperation}
                      onClick={() => submitAction(item)}
                    >
                      Upgrade to Admin
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "1rem" }}>
                <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                  <hr style={{ border: "0.1px solid #A6DCE5" }} />
                </Grid>
              </Grid>
            </>
          ))}
        </Box>
        <Snackbar
          open={alert.showAlert}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={alert.severity} onClose={handleClose}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default CoachManagementModalForAdmin;

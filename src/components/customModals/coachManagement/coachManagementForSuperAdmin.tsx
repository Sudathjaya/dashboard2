import { useState } from "react";
import { Box, Alert, Chip, Typography, Avatar, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Snackbar from "@mui/material/Snackbar";
import { updateTeamRole } from "@/services/teamService";
import { useSession } from "next-auth/react";
import { TEXTS } from "@/public/const";
import { AlertState } from "@/types/interfaces";
import { deleteUserById } from "@/services/userService";

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
  boxCSSForSuperAdmin: {
    width: "60.5rem",
    height: "30rem",
    overflowY: "auto",
    overflowX: "none",
  },
};

const CoachManagementModalForSuperAdmin = ({
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
  const [edit, setEdit] = useState(false);
  const [removeId, serRemoveId] = useState(null);

  const handleClose = () => {
    setAlert({
      showAlert: false,
      severity: "success",
      message: "",
    });
  };

  const handleRemove = (e: any) => {
    serRemoveId(e?.id);
    setEdit(true);
  };

  const handleCancel = () => {
    serRemoveId(null);
    setEdit(false);
  };

  const submitAction = async (e: any, role: string) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await updateTeamRole(session?.user?.accessToken, {
          user_id: e?.id,
          role: role,
        });
        if (data?.status === "OK") {
          setAlert({
            showAlert: true,
            severity: "success",
            message: data?.message,
          });

          setDisplayMessage({
            show: true,
            message: `${e.first_name} ${e.last_name} has been upgraded to ${role}.`,
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

  const submitRemoveAction = async (e: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await deleteUserById(session.user.accessToken, e?.id);
        if (data?.status === "OK") {
          setAlert({
            showAlert: true,
            severity: "success",
            message: data?.message,
          });
          setDisplayMessage({
            show: true,
            message: `${e.first_name} ${e.last_name} has been removed.`,
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
        <Grid container style={{ width: "60.5rem" }}>
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
            size={{ md: 2, xs: 2, sm: 2 }}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography sx={styles.tittleText}>Operation</Typography>
          </Grid>
          <Grid
            size={{ md: 1, xs: 1, sm: 1 }}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography sx={styles.tittleText}></Typography>
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
        <Box sx={styles.boxCSSForSuperAdmin}>
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

                {edit && removeId === item.id ? (
                  <Grid
                    size={{ md: 2, xs: 2, sm: 2 }}
                    container
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      size={{ md: 12, xs: 12, sm: 12 }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        fullWidth
                        size="large"
                        onClick={() => submitRemoveAction(item)}
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: "1.25rem",
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          fontStyle: "normal",
                          width: 100,
                          height: 35,
                          backgroundColor: "#0F9BB0",
                          color: "white",
                          textTransform: "none",
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    size={{ md: 2, xs: 2, sm: 2 }}
                    container
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      size={{ md: 12, xs: 12, sm: 12 }}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      {item?.role === "ADMIN" ? (
                        <div>
                          <Typography
                            sx={styles.tittleTextOperation}
                            onClick={() => submitAction(item, "COACH")}
                          >
                            Downgrade to Coach
                          </Typography>
                          <Typography
                            sx={styles.tittleTextOperation}
                            onClick={() => submitAction(item, "SUPER_ADMIN")}
                          >
                            Upgrade to Super admin
                          </Typography>
                        </div>
                      ) : item?.role === "COACH" ? (
                        <Typography
                          sx={styles.tittleTextOperation}
                          onClick={() => submitAction(item, "ADMIN")}
                        >
                          Upgrade to Admin
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                )}
                <Grid
                  size={{ md: 1, xs: 1, sm: 1 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {edit && removeId === item.id ? (
                    <Button
                      fullWidth
                      size="large"
                      onClick={() => handleCancel()}
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.25rem",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        fontStyle: "normal",
                        width: 100,
                        height: 35,
                        backgroundColor: "white",
                        color: "#0F9BB0",
                        textTransform: "none",
                        border: "2px solid",
                        borderColor: "#0F9BB0",
                      }}
                    >
                      Cancel
                    </Button>
                  ) : item?.role !== "SUPER_ADMIN" ? (
                    <Typography
                      sx={styles.tittleTextOperation}
                      onClick={() => handleRemove(item)}
                    >
                      Remove
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

export default CoachManagementModalForSuperAdmin;

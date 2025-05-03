import { Fragment, useEffect, useState } from "react";
import { Box, Chip, Typography, Avatar } from "@mui/material";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import CoachManagementModalForAdmin from "./coachManagementForAdmin";
import CoachManagementModalForSuperAdmin from "./coachManagementForSuperAdmin";
import { TEXTS } from "@/public/const";
import { getTeamAdmins } from "@/services/userService";

const styles = {
  titleText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "0.9rem",
    lineHeight: "1rem",
    color: "black",
    textAlign: "center",
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
  CoachManagementNotificationText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#0F9BB0",
    fontSize: "15px",
    lineHeight: "30px",
    marginTop: " -0.3rem",
  },
  boxCSS: {
    width: "40.5rem",
    height: "30rem",
    overflowY: "auto",
    overflowX: "none",
  },
  coachManagementTopText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#000000",
    fontSize: "20px",
    lineHeight: "30px",
    marginTop: "-0.3rem",
  },
};

const styleForAdmin = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 700,
  bgcolor: "background.paper",
  borderRadius: "5px",
  p: 4,
};

const styleForCoach = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 810,
  height: 700,
  bgcolor: "background.paper",
  borderRadius: "5px",
  p: 4,
};

const styleForSuperAdmin = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1050,
  height: 700,
  bgcolor: "background.paper",
  borderRadius: "5px",
  p: 4,
};

interface AdminUser {
  first_name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "COACH" | string;
  [key: string]: any;
}

const CoachManagementModal = ({ setOpen, open }: any) => {
  const { user } = useAuth();
  const role = user?.role;
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>([]);
  const [displayMessage, setDisplayMessage] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [open]);

  const loadData = async (): Promise<void> => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await getTeamAdmins(session.user.accessToken);

        const rawData: AdminUser[] = data?.data || [];

        const filteredData = rawData.filter((item) => item?.first_name);

        const sortByFirstName = (a: AdminUser, b: AdminUser) =>
          a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase());

        const filterDataBySuperAdmin = filteredData
          .filter((item) => item.role === "SUPER_ADMIN")
          .sort(sortByFirstName);

        const filterDataByAdmin = filteredData
          .filter((item) => item.role === "ADMIN")
          .sort(sortByFirstName);

        const filterDataByCoach = filteredData
          .filter((item) => item.role === "COACH")
          .sort(sortByFirstName);

        setData([
          ...filterDataBySuperAdmin,
          ...filterDataByAdmin,
          ...filterDataByCoach,
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={
            role === "COACH"
              ? styleForCoach
              : role === "ADMIN"
                ? styleForAdmin
                : styleForSuperAdmin
          }
        >
          <Grid container>
            <Grid
              size={{ md: 12, xs: 12, sm: 12 }}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(false)}
              />
            </Grid>
            <Grid
              size={{ md: 12, xs: 12, sm: 12 }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "55px",
              }}
            >
              <Typography sx={styles.coachManagementTopText}>
                Coach Management
              </Typography>
            </Grid>
            {displayMessage?.show && (
              <Grid
                size={{ md: 12, xs: 12, sm: 12 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "40px",
                }}
              >
                <Typography sx={styles.CoachManagementNotificationText}>
                  {displayMessage?.message}
                </Typography>
              </Grid>
            )}
          </Grid>
          {role === "COACH" ? (
            <>
              <Grid
                container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid container style={{ width: "40.5rem" }}>
                  <Grid
                    size={{ md: 4, xs: 4, sm: 4 }}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography sx={styles.tittleText}>Name</Typography>
                  </Grid>
                  <Grid
                    size={{ md: 6, xs: 6, sm: 6 }}
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
                <Box sx={styles.boxCSS}>
                  {data.map((item: any) => (
                    <Fragment key={item.id}>
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
                            alt="Remy Sharp"
                            src={item.avatar_url}
                            sx={{ width: 35, height: 35 }}
                          />
                        </Grid>
                        <Grid
                          size={{ md: 3, xs: 3, sm: 3 }}
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Grid container>
                            <Grid
                              size={{ md: 12, xs: 12, sm: 12 }}
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={styles.tittleTextData1}>
                                {item?.first_name}
                              </Typography>
                            </Grid>
                            <Grid
                              size={{ md: 12, xs: 12, sm: 12 }}
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={styles.tittleTextData2}>
                                {item?.last_name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          size={{ md: 6, xs: 6, sm: 6 }}
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
                            <Typography sx={styles.tittleTextData}>
                              Coach
                            </Typography>
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
                      </Grid>
                      <Grid container style={{ marginTop: "1rem" }}>
                        <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                          <hr style={{ border: "0.1px solid #A6DCE5" }} />
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))}
                </Box>
              </Grid>{" "}
            </>
          ) : role === "SUPER_ADMIN" ? (
            <CoachManagementModalForSuperAdmin
              data={data}
              loadData={loadData}
              setDisplayMessage={setDisplayMessage}
            />
          ) : (
            <CoachManagementModalForAdmin
              data={data}
              loadData={loadData}
              setDisplayMessage={setDisplayMessage}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CoachManagementModal;

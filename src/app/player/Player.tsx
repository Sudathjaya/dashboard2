import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Avatar,
  Box,
  Button,
  Snackbar,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TEXTS } from "@/public/const";
import {
  deleteTeamMember,
  getTeamPlayers,
  handleTeamPlayVisibility,
} from "@/services/playerService";
import PaginationComponent from "@/components/ui/mainTable/PaginationComponent";

type Severity = "error" | "warning" | "info" | "success";

type Member = {
  member_id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  visible: boolean;
  avatar_url: string;
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  tableHead: {
    display: "flex",
    justifyContent: "center",
    margin: "5px 0px",
  },
  searchBox: {
    width: "76.28%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    width: "76.28%",
    height: "2.37rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  tittle1: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tittle2: {
    width: "25%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tittle3: {
    width: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tittle7: {
    width: "25%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tBody: {
    width: "76.28%",
    height: "4.43rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  tdText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "0.69rem",
    lineHeight: "1rem",
    color: "#444444",
    textAlign: "center",
    textTransform: "capitalize",
  },
  tittle6: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
  },
  item3: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
};

const Player: React.FC = () => {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState<Member[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [active, setActive] = useState<number>(0);
  const [alert, setAlert] = useState<{
    showAlert: boolean;
    severity: Severity;
    message: string;
  }>({
    showAlert: false,
    severity: "success",
    message: "",
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    loadData();
    /* eslint-disable-next-line */
  }, [status, session, pageNumber]);

  const handleRemove = (id: string) => {
    setRemoveId(id);
    setEdit(true);
  };

  const handleCancel = () => {
    setRemoveId(null);
    setEdit(false);
  };

  const loadData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await getTeamPlayers(
          session.user.accessToken,
          pageNumber,
          pageSize,
        );
        if (data) {
          setTotalPages(data.total_pages);
          setTotalRecords(data.total_records);
          setMembers(
            data.data.sort((a: Member) =>
              a.status.toLowerCase() === "active" ? -1 : 1,
            ),
          );
          setActive(data.active_records);
        }
      }
    } catch {
      setAlert({
        showAlert: true,
        severity: "error",
        message:
          "You're not in a Team yet. Please ask your team admin to invite you in.",
      });
    }
  };

  const handleDelete = async (memberId: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await deleteTeamMember(session.user.accessToken, memberId);
        loadData();
        setAlert({
          showAlert: true,
          severity: "success",
          message: "Player successfully deleted.",
        });
      }
    } catch {
      setAlert({
        showAlert: true,
        severity: "error",
        message: "Server error!",
      });
    }
  };

  const handleVisibility = async (memberId: string, visibility: boolean) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await handleTeamPlayVisibility(session.user.accessToken, memberId, {
          visible: !visibility,
        });
        setMembers((prev) =>
          prev.map((item) =>
            item.member_id === memberId
              ? { ...item, visible: !visibility }
              : item,
          ),
        );
      }
    } catch {
      setAlert({
        showAlert: true,
        severity: "error",
        message: "Server error!",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  return (
    <Box sx={{ marginTop: "3.68rem" }}>
      <Snackbar
        open={alert.showAlert}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, showAlert: false })}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, showAlert: false })}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Box sx={styles.container}>
        <Box sx={styles.searchBox}>
          <Typography
            variant="h5"
            style={{
              fontSize: "0.87rem",
              lineHeight: "1rem",
              marginBottom: "1%",
            }}
          >
            You have invited {totalRecords ? totalRecords : "--"} players.{" "}
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                color: "#0f9bb0",
              }}
            >
              {active ? active : "--"}
            </span>{" "}
            players accepted your invitation.{" "}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.tableHead}>
        <Box sx={styles.header}>
          <Box sx={styles.tittle1}>
            <Typography
              variant="h5"
              style={{
                margin: "0 5px 0 0",
                fontSize: "0.78rem",
                lineHeight: "1rem",
              }}
            >
              Name
            </Typography>
          </Box>
          <Box sx={styles.tittle2}>
            <Typography
              variant="h5"
              style={{
                margin: "0 5px 0 0",
                fontSize: "0.78rem",
                lineHeight: "1rem",
              }}
            >
              Email
            </Typography>
          </Box>
          <Box sx={styles.tittle3}>
            <Typography
              variant="h5"
              style={{
                margin: "0 5px 0 0",
                fontSize: "0.78rem",
                lineHeight: "1rem",
              }}
            >
              Status
            </Typography>
          </Box>
          <Box sx={styles.tittle3}>
            <Typography
              variant="h5"
              style={{
                margin: "0 5px 0 0",
                fontSize: "0.78rem",
                lineHeight: "1rem",
              }}
            >
              Visible on Dashboard
            </Typography>
          </Box>
          <Box sx={styles.tittle3}>
            <Typography
              variant="h5"
              style={{
                margin: "0 5px 0 0",
                fontSize: "0.78rem",
                lineHeight: "1rem",
              }}
            >
              Remove
            </Typography>
          </Box>
        </Box>
      </Box>
      {members.map((item, index) => (
        <Box sx={styles.container} style={{ cursor: "pointer" }} key={index}>
          <Box sx={styles.tBody}>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "30%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "150px",
                }}
              >
                <Avatar
                  alt="profile"
                  src={item?.avatar_url}
                  sx={{ width: 30, height: 30, marginRight: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item?.first_name} {item?.last_name}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.tittle7}>
              <Typography
                variant="h6"
                style={{
                  fontSize: "0.69rem",
                  lineHeight: "1rem",
                  textTransform: "none",
                }}
              >
                {item?.email}
              </Typography>
            </Box>
            <Box sx={styles.tittle3}>
              <Typography
                variant="h4"
                style={{
                  fontSize: "0.69rem",
                  lineHeight: "1rem",
                  textTransform: "capitalize",
                }}
              >
                {item?.status.toLowerCase()}
              </Typography>
            </Box>
            <Box sx={styles.tittle3}>
              {edit && removeId === item?.member_id ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => handleDelete(item?.member_id)}
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.25rem",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontStyle: "normal",
                    width: 100,
                    height: 35,
                    textTransform: "none",
                    margin: "10px 0",
                  }}
                >
                  Remove
                </Button>
              ) : (
                <Typography sx={styles.tdText}>
                  {item.visible ? (
                    item?.status.toLowerCase() === "active" ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Image
                          src="/images/svg/visibilityIconBlue.svg"
                          alt="visibilityIconBlue"
                          width="20"
                          height="20"
                          onClick={() =>
                            handleVisibility(item.member_id, item.visible)
                          }
                        />
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Image
                          src="/images/svg/visibilityIcon.svg"
                          alt="visibilityIcon"
                          width="20"
                          height="20"
                          onClick={() =>
                            handleVisibility(item.member_id, item.visible)
                          }
                        />
                      </Box>
                    )
                  ) : item?.status.toLowerCase() === "active" ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Image
                        src="/images/svg/visibilityOffBlue.svg"
                        alt="visibilityOffBlue"
                        width="20"
                        height="20"
                        onClick={() =>
                          handleVisibility(item.member_id, item.visible)
                        }
                      />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Image
                        src="/images/svg/visibilityOff.svg"
                        alt="visibilityOff"
                        width="20"
                        height="20"
                        onClick={() =>
                          handleVisibility(item.member_id, item.visible)
                        }
                      />
                    </Box>
                  )}
                </Typography>
              )}
            </Box>
            <Box sx={styles.tittle3}>
              <Typography sx={styles.tdText}>
                {edit && removeId === item?.member_id ? (
                  <Button
                    fullWidth
                    size="large"
                    color="primary"
                    onClick={() => handleCancel()}
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.25rem",
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontStyle: "normal",
                      width: 100,
                      height: 35,
                      textTransform: "none",
                      border: "2px solid",
                    }}
                  >
                    Cancel
                  </Button>
                ) : (
                  <CloseIcon
                    sx={{ width: 20, height: 20, color: "#0F9BB0" }}
                    onClick={() => handleRemove(item.member_id)}
                  />
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box sx={styles.pagination}>
        <Stack spacing={2}>
          <PaginationComponent
            page={pageNumber}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            setPageSize={setPageSize}
            pageSize={pageSize}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Player;

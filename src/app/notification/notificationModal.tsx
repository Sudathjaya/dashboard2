import { useState, useEffect, MouseEvent } from "react";
import {
  Popover,
  Typography,
  Box,
  Avatar,
  Badge,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import RealTimeNotificationModal from "./realTimeNotification";
import {
  getNotificationsList,
  getNotificationsMarkActionComplete,
  getNotificationsMarkAsSeen,
} from "@/services/notificationService";
import { TEXTS } from "@/public/const";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import { useAuth } from "@/context/AuthContext";
interface NotificationModalProps {
  setOpenAuthentication: (val: boolean) => void;
  setOpenedAccount: (val: boolean) => void;
}

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  data?: {
    request_id?: string;
    status?: string;
  };
}

const styles = {
  boxCSS: {
    width: "25.5rem",
    overflowY: "auto",
    overflowX: "hidden",
  },
  boxCSS2: {
    width: "25.5rem",
    border: "2px solid #0F9BB0",
    borderStyle: "none none double double",
    overflowX: "hidden",
  },
  boxCSSUnRead: {
    width: "25.5rem",
    border: "2px solid #0F9BB0",
    backgroundColor: "#ECF9F7",
    borderStyle: "none none double double",
    overflowX: "hidden",
  },
  boxCSSRead: {
    width: "25.5rem",
    border: "2px solid #0F9BB0",
    backgroundColor: "#FFFFFF",
    borderStyle: "none none double double",
    overflowX: "hidden",
  },
  notificationHeader: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: "15px",
    p: 3,
  },
  notificationDate: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    mt: "0.3rem",
    p: 1,
  },
  notificationMessage: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
  },
};

const NotificationModal = ({
  setOpenAuthentication,
  setOpenedAccount,
}: any) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [dot, setDot] = useState(false);
  const [notificationData, setNotificationData] = useState<NotificationItem[]>([]);
  const [matchNotificationData, setMatchNotificationData] = useState<NotificationItem[]>([]);
  const [newNotificationData, setNewNotificationData] = useState<NotificationItem[]>([]);
  const [readNotificationData, setReadNotificationData] = useState<NotificationItem[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { user } = useAuth();
  const profilePic = user?.avatar_url ?? "";
  const role = user?.role ?? "";

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);

    if (matchNotificationData.length !== notificationData.length) {
      setDot(false);
      setMatchNotificationData(notificationData);
      setNewNotificationData(notificationData);
    }

    const newNotifi = notificationData.filter(
      (o1) => !matchNotificationData.some((o2) => o1.id === o2.id)
    );
    const read = notificationData.filter((o1) =>
      matchNotificationData.some((o2) => o1.id === o2.id)
    );

    setNewNotificationData(newNotifi);
    setReadNotificationData(read);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadNotificationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNotificationData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await getNotificationsList(session.user.accessToken);
        if (matchNotificationData.length !== data.data?.length) {
          setDot(true);
        }
        setNotificationData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (item: NotificationItem) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getNotificationsMarkActionComplete(
          session.user.accessToken,
          item.data?.request_id
        );
        await getNotificationsMarkAsSeen(session.user.accessToken, item.id);
        setOpenAuthentication(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const handleReview = async (item: NotificationItem) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getNotificationsMarkAsSeen(session.user.accessToken, item.id);
        setOpenedAccount(true);
        loadNotificationData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const handleMarkAsSeen = async (item: NotificationItem) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getNotificationsMarkAsSeen(session.user.accessToken, item.id);
        const { data } = await getNotificationsList(session.user.accessToken);
        setNotificationData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Badge
        variant="dot"
        invisible={!dot}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#56E4D7",
          },
        }}
      >
        <Image
          width={15}
          height={16}
          alt="notification"
          src="/images/svg/notification.svg"
          onClick={handleClick}
          style={{ margin: 0, cursor: "pointer" }}
        />
      </Badge>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={styles.boxCSS}>
          <Box sx={styles.boxCSS2}>
            <Typography sx={styles.notificationHeader}>
              Notification: {newNotificationData.length} new
            </Typography>
          </Box>

          {[...newNotificationData, ...readNotificationData].map((item, idx) => {
            const isNew = newNotificationData.includes(item);
            return (
              <Box
                key={item.id || idx}
                sx={isNew ? styles.boxCSSUnRead : styles.boxCSSRead}
              >
                <Grid container>
                  <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                    <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                      <Typography sx={styles.notificationDate}>
                        {`${moment(item.time).format("LT")} ${moment(item.time).format("ll")}`}
                      </Typography>
                    </Grid>
                    <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                      <Grid container>
                        <Grid
                          size={{ md: 2, xs: 2, sm: 2 }}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Avatar src={profilePic} sx={{ width: 35, height: 35 }} />
                        </Grid>
                        <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                          <Typography
                            sx={{
                              p: 2,
                              fontFamily: "Poppins",
                              fontWeight: 400,
                              fontSize: "13.5px",
                              color: "#000000",
                            }}
                          >
                            {item.message}{" "}
                            <span
                              style={{
                                color: "#0F9BB0",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                role === "COACH"
                                  ? handleVerify(item)
                                  : handleReview(item)
                              }
                            >
                              {role === "COACH"
                                ? item.data?.status !== "DECLINED"
                                  ? "Verify Now"
                                  : null
                                : "Review"}
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    size={{ md: 2, xs: 2, sm: 2 }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton onClick={() => handleMarkAsSeen(item)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Popover>

      <RealTimeNotificationModal
        setOpenAuthentication={setOpenAuthentication}
        setOpenedAccount={setOpenedAccount}
        setNotificationData={setNotificationData}
        setDot={setDot}
        notificationData={notificationData}
      />
    </Box>
  );
};

export default NotificationModal;
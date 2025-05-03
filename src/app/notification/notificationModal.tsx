import { useState, useEffect } from "react";
import { Popover, Typography, Box, Avatar, Badge } from "@mui/material";
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
import { NotificationModalProps } from "@/types/interfaces";

const styles = {
  boxCSS: {
    width: "25.5rem",
    overflowY: "auto",
  },
  boxCSS2: {
    width: "25.5rem",
    border: "2px solid #0F9BB0",
    borderStyle: "none none double double",
  },
  boxCSSUnRead: {
    width: "25.5rem",
    border: "2px solid #0F9BB0",
    backgroundColor: "#ECF9F7",
    borderStyle: "none none double double",
  },
  boxCSSRead: {
    width: "25.5rem",
    border: "2px solid #0F9BB0",
    backgroundColor: "#FFFFFF",
    borderStyle: "none none double double",
  },
  boxCSSRealTime: {
    width: "25.5rem",
    border: "2px solid #0F9BB0",
    backgroundColor: "#FFFFFF",
  },
  notificationHeader: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    color: "#000000",
    fontSize: "15px",
    lineHeight: "0px",
    p: 3,
  },
  notificationDate: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    color: "#000000",
    fontSize: "12px",
    lineHeight: "0px",
    marginTop: "0.3rem",
    p: 1,
  },
  notificationMessage: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    color: "#000000",
    fontSize: "12px",
    lineHeight: "0px",
  },
};

const NotificationModal = ({
  setOpenAuthentication,
  setOpenedAccount,
}: NotificationModalProps) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [dot, setDot] = useState(false);
  const [notificationData, setNotificationData] = useState<any>([]);
  const [matchNotificationData, setMatchNotificationData] = useState([]);
  const [newNotificationData, setNewNotificationData] = useState([]);
  const [readNotificationData, setReadNotificationData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();
  const profilePic = user?.avatar_url;
  const role = user?.role;

  const handleClick = (event: any) => {
    setAnchorEl(event?.currentTarget ? event?.currentTarget : anchorEl);
    setOpen(true);
    if (matchNotificationData?.length !== notificationData?.length) {
      setDot(false);
      setMatchNotificationData(notificationData);
      setNewNotificationData(notificationData);
    }
    const newNotifi = notificationData.filter(function (o1: any) {
      // filter out (!) items in result2
      return !matchNotificationData.some(function (o2: any) {
        return o1.id === o2.id; // assumes unique id
      });
    });
    const read = notificationData.filter(function (o1: any) {
      // filter out (!) items in result2
      return matchNotificationData.some(function (o2: any) {
        return o1.id === o2.id; // assumes unique id
      });
    });
    setNewNotificationData(newNotifi);
    setReadNotificationData(read);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadNotificationData();
    // eslint-disable-next-line
  }, []);

  const loadNotificationData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await getNotificationsList(session?.user?.accessToken);
        if (matchNotificationData?.length !== data.data?.length) {
          setDot(true);
        }
        setNotificationData(data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleVerify = async (e: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getNotificationsMarkActionComplete(
          session?.user?.accessToken,
          e?.data?.request_id,
        );
        await getNotificationsMarkAsSeen(session?.user?.accessToken, e.id);
        setOpenAuthentication(true);
      }
    } catch (error: any) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleReview = async (e: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getNotificationsMarkAsSeen(session?.user?.accessToken, e.id);
        setOpenedAccount(true);
        loadNotificationData();
      }
    } catch (error: any) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleMarkAsSeen = async (e: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await getNotificationsMarkAsSeen(session?.user?.accessToken, e.id);
        const { data } = await getNotificationsList(session?.user?.accessToken);
        setOpen(false);
        setNotificationData(data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Box>
        {dot ? (
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#56E4D7",
              },
            }}
            variant="dot"
          >
            <Image
              width={15}
              height={16}
              alt="notification"
              src="/images/svg/notification.svg"
              onClick={handleClick}
              style={{ marginLeft: "1.5rem", margin: 0, cursor: "pointer" }}
            />
          </Badge>
        ) : (
          <Badge>
            <Image
              width={15}
              height={16}
              alt="notification"
              src="/images/svg/notification.svg"
              onClick={handleClick}
              style={{ marginLeft: "1.5rem", margin: 0, cursor: "pointer" }}
            />
          </Badge>
        )}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={styles.boxCSS}>
          <Box sx={styles.boxCSS2}>
            <Typography sx={styles.notificationHeader}>
              Notification: {newNotificationData?.length} new
            </Typography>
          </Box>
          {newNotificationData.map((item: any, idx: any) => (
            <Box sx={styles.boxCSSUnRead} key={idx}>
              <Grid container>
                <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                  <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                    <Typography
                      sx={styles.notificationDate}
                    >{`${moment(item?.time).format("LT")}  ${moment(item?.time).format("ll")}`}</Typography>
                  </Grid>
                  <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                    <Grid container>
                      <Grid
                        size={{ md: 2, xs: 2, sm: 2 }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={profilePic}
                          sx={{ width: 35, height: 35 }}
                        />
                      </Grid>
                      <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                        {role === "COACH" ? (
                          <Typography
                            sx={{
                              p: 2,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "13.5px",
                              color: "#000000",
                            }}
                          >
                            {item?.message}{" "}
                            <span
                              style={{
                                color: "#0F9BB0",
                                textDecorationLine: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => handleVerify(item)}
                            >
                              {item?.data?.status !== "DECLINED"
                                ? "Verify Now"
                                : null}
                            </span>
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              p: 2,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "13.5px",
                              color: "#000000",
                            }}
                          >
                            {item?.message}{" "}
                            <span
                              style={{
                                color: "#0F9BB0",
                                textDecorationLine: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => handleReview(item)}
                            >
                              Review
                            </span>
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ md: 2, xs: 2, sm: 2 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMarkAsSeen(item)}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
          {readNotificationData.map((item: any, idx: any) => (
            <Box sx={styles.boxCSSRead} key={idx}>
              <Grid container>
                <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                  <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                    <Typography
                      sx={styles.notificationDate}
                    >{`${moment(item?.time).format("LT")}  ${moment(item?.time).format("ll")}`}</Typography>
                  </Grid>
                  <Grid size={{ md: 12, xs: 12, sm: 12 }}>
                    <Grid container>
                      <Grid
                        size={{ md: 2, xs: 2, sm: 2 }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={profilePic}
                          sx={{ width: 35, height: 35 }}
                        />
                      </Grid>
                      <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                        {role === "COACH" ? (
                          <Typography
                            sx={{
                              p: 2,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "13.5px",
                              color: "#000000",
                            }}
                          >
                            {item?.message}{" "}
                            <span
                              style={{
                                color: "#0F9BB0",
                                textDecorationLine: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => handleVerify(item)}
                            >
                              {item?.data?.status !== "DECLINED"
                                ? "Verify Now"
                                : null}
                            </span>
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              p: 2,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "13.5px",
                              color: "#000000",
                            }}
                          >
                            {item?.message}{" "}
                            <span
                              style={{
                                color: "#0F9BB0",
                                textDecorationLine: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => handleReview(item)}
                            >
                              Review
                            </span>
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ md: 2, xs: 2, sm: 2 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMarkAsSeen(item)}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Popover>
      <RealTimeNotificationModal
        setOpenAuthentication={setOpenAuthentication}
        setOpenedAccount={setOpenedAccount}
        setNotificationData={setNotificationData}
        setDot={setDot}
        notificationData={notificationData}
      />
    </div>
  );
};

export default NotificationModal;

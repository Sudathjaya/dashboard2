import { useEffect, useState, useCallback, useMemo } from "react";
import { Popover, Typography, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import {
  getNotificationsList,
  getNotificationsMarkActionComplete,
  getNotificationsMarkAsSeen,
} from "@/services/notificationService";

import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { TEXTS } from "@/public/const";
import { RealTimeNotificationModalProps } from "@/types/interfaces";
import useSocketHook from "@/lib/socket";

const styles = {
  boxCSS: {
    width: "25.5rem",
    overflowY: "auto",
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
  closeIcon: { cursor: "pointer", margin: "5px", padding: "2px" },
};

const RealTimeNotificationModal = ({
  setOpenAuthentication,
  setOpenedAccount,
  setNotificationData,
  setDot,
  notificationData,
}: RealTimeNotificationModalProps) => {
  const { data: session, status } = useSession();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const socket = useSocketHook();
  // Memoized values to avoid recalculations
  const profilePic = useMemo(() => user?.avatar_url, [user]);
  const role = useMemo(() => user?.role, [user]);

  useEffect(() => {
    socket.on("message", (data: any) => {
      setRealTimeData(data);
      loadNotificationData();
      setOpen(true);
      setTimeout(() => setOpen(false), 6000);
    });
  }, [role]);

  const handleClose = () => setOpen(false);

  const loadNotificationData = useCallback(async () => {
    if (status !== TEXTS.AUTHENTICATED || !session?.user?.accessToken) return;
    try {
      const { data } = await getNotificationsList(session.user.accessToken);
      setNotificationData(data.data);
      setDot(true);
    } catch (error) {
      console.error(error);
    }
  }, [session, status, setNotificationData, setDot]);

  const handleAction = useCallback(
    async (e: any, action: "verify" | "review") => {
      if (status !== TEXTS.AUTHENTICATED || !session?.user?.accessToken) return;

      try {
        const notification = notificationData.find(
          (item: { data: { request_id: any } }) =>
            item.data.request_id === e.data.request_id,
        );

        if (!notification) return;

        if (action === "verify") {
          await getNotificationsMarkActionComplete(
            session.user.accessToken,
            e.data.request_id,
          );
          setOpenAuthentication(true);
        } else {
          setOpenedAccount(true);
        }

        await getNotificationsMarkAsSeen(
          session.user.accessToken,
          notification.id,
        );
        const { data } = await getNotificationsList(session.user.accessToken);
        setNotificationData(data.data);
        setDot(false);
      } catch (error) {
        console.error(error);
      } finally {
        setOpen(false);
      }
    },
    [
      session,
      status,
      notificationData,
      setOpenAuthentication,
      setOpenedAccount,
      setNotificationData,
      setDot,
    ],
  );

  return (
    <Popover
      id={open ? "simple-popover" : undefined}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Box sx={styles.boxCSS}>
        <Box sx={styles.boxCSSRealTime}>
          <Grid container>
            <Grid size={{ md: 12, xs: 12, sm: 12 }}>
              <Grid container justifyContent="flex-end" alignItems="flex-end">
                <CloseIcon sx={styles.closeIcon} onClick={handleClose} />
              </Grid>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -0.5, mb: 0.5 }}
              >
                <Typography sx={styles.notificationHeader}>
                  Notification
                </Typography>
              </Grid>
              <Grid container sx={{ mb: 1 }}>
                <Grid
                  size={{ md: 2, xs: 2, sm: 2 }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    alt="Profile"
                    src={profilePic}
                    sx={{ width: 35, height: 35 }}
                  />
                </Grid>
                <Grid size={{ md: 10, xs: 10, sm: 10 }}>
                  <Typography
                    sx={{ p: 2, fontWeight: 500, fontSize: "13.5px" }}
                  >
                    {realTimeData?.message}
                    <span
                      style={{
                        color: "#0F9BB0",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleAction(
                          realTimeData,
                          role === "COACH" ? "verify" : "review",
                        )
                      }
                    >
                      {role === "COACH" &&
                      realTimeData?.data?.status !== "DECLINED"
                        ? "Verify Now"
                        : "Review"}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Popover>
  );
};

export default RealTimeNotificationModal;

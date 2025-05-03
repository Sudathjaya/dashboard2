"use client";
import Grid from "@mui/material/Grid2";
import NotificationModal from "./notificationModal";

const NotificationPage = ({
  setOpenAuthenticationBefore,
  setOpenedAccount,
}: any) => {
  return (
    <Grid>
      <NotificationModal
        setOpenAuthentication={setOpenAuthenticationBefore}
        setOpenedAccount={setOpenedAccount}
      />
    </Grid>
  );
};

export default NotificationPage;

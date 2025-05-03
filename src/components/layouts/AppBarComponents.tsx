import Image from "next/image";
import { MENU_ITEMS } from "../../../public/const";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Badge,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  DesktopViewProps,
  MobileViewProps,
  TabletViewProps,
  UserProps,
} from "@/types/interfaces";
import { useState } from "react";
import NotificationPage from "@/app/notification/page";
import AddUser from "@/app/addUser/addUser";

const styles = {
  toolBar: {
    backgroundColor: "#313131",
  },
  user: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "1.31rem",
    margin: "5px 10px",
    color: "white",
    borderBottom: "2px solid transparent",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonTxt: {
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24px",
    textAlign: "left",
    color: "#D4DEDF",
    position: "relative",
    "&:hover": {
      color: "#FFFFFF",
      "&::after": {
        content: '""',
        position: "absolute",
        width: "50%",
        height: "2px",
        backgroundColor: "#60D1C4",
        bottom: "-4px",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
  },
  activeButtonTxt: {
    color: "#FFFFFF",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "50%",
      height: "2px",
      backgroundColor: "#60D1C4",
      bottom: "-4px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  avt: { width: 25, height: 25 },
  userContainer: { display: "flex", alignItems: "center", cursor: "pointer" },
  tabViewContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "right",
    gap: 0,
  },
  userImage: { cursor: "pointer", marginRight: "1rem", marginLeft: "1rem" },
  addDevicesImage: { cursor: "pointer", marginRight: "1rem" },
  desktopViewContainer: { marginLeft: "30px", marginRight: "30px" },
  desktopViewBox: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    gap: 2,
    cursor: "pointer",
  },
};

export const Logo = ({
  wI1 = 25,
  hI1 = 25,
  wI2 = 35,
  hI2 = 13,
  wI3 = 238,
  hI3 = 20,
}) => (
  <Box display="flex" alignItems="center">
    <Image
      src="/images/svg/oxiwear_logo.svg"
      alt="oxiwear_logo"
      width={wI1}
      height={hI1}
    />
    <Image src="/images/svg/line.svg" alt="line" width={wI2} height={hI2} />
    <Image
      src="/images/svg/whitelablingLogo.svg"
      alt="devLogo"
      width={wI3}
      height={hI3}
    />
  </Box>
);

export const User = ({ handleClick, avatar, firstName }: UserProps) => (
  <Box sx={styles.userContainer} onClick={handleClick}>
    <Avatar alt="UserPhoto" src={avatar || ""} sx={styles.avt} />
    <Typography sx={styles.user}>{firstName}</Typography>
    <Image
      src="/images/svg/selector.svg"
      alt="selector"
      width={12}
      height={7}
    />
  </Box>
);

export const MobileView = ({ toggleDrawer }: MobileViewProps) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
  >
    <Logo />
    <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
      <MenuIcon />
    </IconButton>
  </Box>
);

export const TabletView = ({
  selectedItem,
  setItem,
  handleClick,
  userProfile,
}: TabletViewProps) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
    sx={{ marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }}
  >
    <Logo wI3={200} />
    <Box sx={styles.tabViewContainer}>
      {MENU_ITEMS?.map((item) => (
        <Button
          key={item.value}
          sx={{
            ...styles.buttonTxt,
            ...(selectedItem === item.value ? styles.activeButtonTxt : {}),
            fontSize: "14px",
          }}
          onClick={() => setItem(item.value)}
        >
          {item.title}
        </Button>
      ))}
    </Box>
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" gap={1}>
        <Image
          alt="addUsers"
          src="/images/svg/addUsers.svg"
          onClick={() => setItem("users")}
          width={24}
          height={24}
          style={styles.userImage}
        />
        <Image
          alt="addDevices"
          src="/images/svg/addDevices.svg"
          width={24}
          height={24}
          style={styles.addDevicesImage}
        />
        <Badge
          sx={{
            marginRight: "1.5rem",
            "& .MuiBadge-badge": {
              backgroundColor: "#56E4D7",
              position: "absolute",
              top: "4px",
            },
          }}
          variant="dot"
        >
          <Image
            alt="notification"
            src="/images/svg/notification.svg"
            width={15}
            height={24}
            style={{ cursor: "pointer" }}
          />
        </Badge>
      </Box>
      <User
        handleClick={handleClick}
        avatar={userProfile?.avatar_url || ""}
        firstName={userProfile?.first_name || ""}
      />
    </Box>
  </Box>
);

export const DesktopView = ({
  dot,
  selectedItem,
  setItem,
  handleClick,
  userProfile,
  setOpenAuthenticationBefore,
  setOpenedAccount,
}: DesktopViewProps) => {
  const [openDevices, setOpenDevices] = useState(false);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={styles.desktopViewContainer}
      >
        <Logo wI1={30} hI1={30} wI2={40} hI2={18} />
        <Box sx={styles.desktopViewBox}>
          {MENU_ITEMS.map((item) => (
            <Button
              key={item.value}
              sx={{
                ...styles.buttonTxt,
                ...(selectedItem === item.value ? styles.activeButtonTxt : {}),
              }}
              onClick={() => setItem(item.value)}
            >
              {item.title}
            </Button>
          ))}
        </Box>
        <Box display="flex" alignItems="center">
          <Image
            alt="addUsers"
            src="/images/svg/addUsers.svg"
            onClick={() => setItem("users")}
            width={24}
            height={24}
            style={{ margin: "0px 1.5rem", cursor: "pointer" }}
          />
          <Image
            alt="addDevices"
            width={24}
            height={24}
            src="/images/svg/addDevices.svg"
            onClick={() => setOpenDevices(!openDevices)}
            style={{ cursor: "pointer" }}
          />

          <Box sx={{ margin: "0rem 1.5rem 0rem 1.5rem" }}>
            {dot ? (
              <NotificationPage
                setOpenAuthentication={setOpenAuthenticationBefore}
                setOpenedAccount={setOpenedAccount}
              />
            ) : (
              <NotificationPage
                setOpenAuthentication={setOpenAuthenticationBefore}
                setOpenedAccount={setOpenedAccount}
              />
            )}
          </Box>
          <User
            handleClick={handleClick}
            avatar={userProfile?.avatar_url || ""}
            firstName={userProfile?.first_name || ""}
          />
        </Box>
      </Box>

      {/* <AuthenticationBeforeModal
        setOpen={setOpenAuthenticationBefore}
        open={openedAuthenticationBefore}
        setSuccessEmailForAdmin={setSuccessEmailForAdmin}
        setOpenedEmail={setOpenedEmail} /> */}

      {openDevices ? (
        <AddUser setOpenDevices={setOpenDevices} openDevices={openDevices} />
      ) : (
        <></>
      )}
    </>
  );
};

import { memo, MouseEvent, useState } from "react";
import {
  useMediaQuery,
  Theme,
  Toolbar,
  AppBar,
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import {
  DASHBOARD,
  DOT,
  MENU_ITEMS,
  ROUTE_ENDPOINT,
  USER_MENU_ITEMS,
} from "../../../public/const";
import { DesktopView, MobileView, TabletView, User } from "./AppBarComponents";
import {
  DrawerViewProps,
  MenuViewProps,
  TopBarProps,
} from "@/types/interfaces";
import { useRouter } from "next/navigation";
import CoachManagementModal from "../customModals/coachManagement/coachManagementModal";
import SubscriptionMainModal from "../customModals/subscription/subscriptionmain";
import SupportModal from "../customModals/support/supportModal";
import AccountModal from "../customModals/account/accountModal";
import LogOutModal from "@/app/settings/logOutModal";
import { signOut } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

const styles = {
  appBar: { backgroundColor: "#313131", position: "static" },
  menu: { display: "flex", flexDirection: "column", alignItems: "center" },
  drawerContent: { width: "70vw" },
  iconButton: { color: "#FFF" },
  actionIcons: {
    backgroundColor: "#313131",
    display: "flex",
    justifyContent: "space-around",
    padding: 1,
  },
  badgeDot: { "& .MuiBadge-badge": { backgroundColor: "#56E4D7" } },
};

// Menu View Component
const MenuView = memo(
  ({ handleClose, handleMenuItem, open, anchorEl }: MenuViewProps) => (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box sx={styles.menu} onClick={handleClose}>
        {USER_MENU_ITEMS.map((item, id) => (
          <MenuItem onClick={() => handleMenuItem(item)} key={id + item}>
            {item}
          </MenuItem>
        ))}
      </Box>
    </Menu>
  ),
);
MenuView.displayName = "MenuView";

// Drawer View Component
const DrawerView = memo(
  ({
    drawerOpen,
    toggleDrawer,
    setDrawerOpen,
    handleClick,
    userProfile,
  }: DrawerViewProps) => (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box sx={styles.drawerContent}>
        <Box
          display="flex"
          alignItems="center"
          p={2}
          justifyContent="space-between"
        >
          <User
            handleClick={handleClick}
            avatar={userProfile?.avatar_url || ""}
            firstName={userProfile?.first_name || ""}
          />
          <Box
            onClick={() => setDrawerOpen(false)}
            display="flex"
            alignItems="center"
            ml="auto"
          >
            <CloseIcon sx={styles.iconButton} fontSize="small" />
          </Box>
        </Box>
        <Divider />
        <List>
          {MENU_ITEMS.map((text, id) => (
            <Box key={id}>
              <ListItem component="div" onClick={toggleDrawer(false)}>
                <ListItemText primary={text.title} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        <Box sx={styles.actionIcons}>
          {["addUsers", "addDevices", "notification"].map((icon, id) => (
            <Badge
              key={id + icon}
              variant={icon === "notification" ? "dot" : undefined}
              sx={styles.badgeDot}
            >
              <Image
                alt={icon}
                src={`/images/svg/${icon}.svg`}
                width={24}
                height={24}
              />
            </Badge>
          ))}
        </Box>
        <Divider />
      </Box>
    </Drawer>
  ),
);
DrawerView.displayName = "DrawerView";

// Main TopBar Component
const TopBar = ({ userProfile }: TopBarProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("sm", "md"),
  );

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open: boolean = Boolean(anchorEl);
  const [selectedItem, setItem] = useState<string>(DASHBOARD);
  const [coachManagement, setCoachManagement] = useState(false);
  const [openSubscriptionMainModal, setOpenSubscriptionMainModal] =
    useState(false);
  const [openedSupport, setOpenedSupport] = useState(false);
  const [openedAccount, setOpenedAccount] = useState(false);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [openedAuthenticationBefore, setOpenAuthenticationBefore] =
    useState(false);
  const [openedPassword, setOpenedPassword] = useState(false);
  const [openedAuthentication, setOpenAuthentication] = useState(false);
  const [isOpenLogoutModal, setOpenlogoutModal] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    logout();
    await signOut({ redirect: false });
    router.push(ROUTE_ENDPOINT.LOGIN)
  };

  const handleMenuItem = (type: string) => {
    if (type === "Coach Management") {
      setCoachManagement(!coachManagement);
    } else if (type === "Subscription") {
      setOpenSubscriptionMainModal(!openSubscriptionMainModal);
    } else if (type === "Support") {
      setOpenedSupport(!openedSupport);
    } else if (type === "Account") {
      setOpenedAccount(!openedAccount);
    } else if (type === "Logout") {
      setOpenlogoutModal(!isOpenLogoutModal);
    }
  };

  const handleNavigation = (val: string) => {
    setItem(val);
    router.push(val);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  return (
    <>
      <AppBar sx={styles.appBar}>
        <Toolbar>
          {isMobile ? (
            <MobileView toggleDrawer={toggleDrawer} />
          ) : isTablet ? (
            <TabletView
              selectedItem={selectedItem}
              setItem={handleNavigation}
              handleClick={handleClick}
              userProfile={userProfile}
              setOpenAuthenticationBefore={setOpenAuthenticationBefore}
              setOpenedAccount={setOpenedAccount}
            />
          ) : (
            <DesktopView
              dot={DOT}
              selectedItem={selectedItem}
              setItem={handleNavigation}
              handleClick={handleClick}
              userProfile={userProfile}
              setOpenAuthenticationBefore={setOpenAuthenticationBefore}
              setOpenedAccount={setOpenedAccount}
            />
          )}
        </Toolbar>
      </AppBar>
      <DrawerView
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        setDrawerOpen={setDrawerOpen}
        handleClick={handleClick}
        userProfile={userProfile}
      />
      <MenuView
        handleClose={handleClose}
        handleMenuItem={handleMenuItem}
        open={open}
        anchorEl={anchorEl}
      />
      <CoachManagementModal
        setOpen={setCoachManagement}
        open={coachManagement}
      />
      <SubscriptionMainModal
        setOpen={setOpenSubscriptionMainModal}
        open={openSubscriptionMainModal}
      />
      <SupportModal setOpen={setOpenedSupport} open={openedSupport} />
      <AccountModal
        setOpen={setOpenedAccount}
        open={openedAccount}
        setOpenedPassword={setOpenedPassword}
        setOpenAuthentication={setOpenAuthentication}
      />
      <LogOutModal
        open={isOpenLogoutModal}
        setOpen={setOpenlogoutModal}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default memo(TopBar);

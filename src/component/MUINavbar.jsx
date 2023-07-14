import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EnhancedEncryptionOutlinedIcon from "@mui/icons-material/EnhancedEncryptionOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import FeedbackIcon from "@mui/icons-material/Feedback";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBank";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { removeLevelInfo } from "../localStorage/localStorage";
import {
  useGetMyProfileQuery,
  useLazyGetUserByIdQuery,
  useLogOutMutation,
} from "../services/api/admin/auth";
import MUILoading from "./MUILoading";
import MUIToast from "./MUIToast";

const drawerWidth = 240;

const navDataAdmin = [
  {
    name: "DeerwalkFoods",
    icon: <FoodBankOutlinedIcon />,
    link: "https://deerwalkfoods.com/",
  },
  {
    name: "FeedBack",
    icon: <FeedbackIcon />,
    link: "https://deerwalkfoods.com/",
  },
  {
    name: "Student Deposit",
    icon: <AccountBalanceIcon />,
    link: "https://deerwalkfoods.com/",
  },
  {
    name: "Reports",
    icon: <ReceiptLongIcon />,
    link: "https://deerwalkfoods.com/",
  },
  {
    name: "All Users",
    icon: <PeopleAltOutlinedIcon />,
    link: "/allusers",
  },
  {
    name: "My Profile",
    icon: <AccountBoxIcon />,
    link: "/myprofile",
  },
  {
    name: "Update Password",
    icon: <EnhancedEncryptionOutlinedIcon />,
    link: "/auth/update-password",
  },
];

const navDataCanteen = [
  {
    name: "DeerwalkFoods",
    icon: <FoodBankOutlinedIcon />,
    link: "https://deerwalkfoods.com/",
  },
  {
    name: "FeedBack",
    icon: <FeedbackIcon />,
    link: "https://deerwalkfoods.com/",
  },
  {
    name: "Reports",
    icon: <ReceiptLongIcon />,
    link: "https://deerwalkfoods.com/",
  },
  {
    name: "Food Category",
    icon: <FastfoodOutlinedIcon />,
    link: "/food-category",
  },
  {
    name: "Food Item",
    icon: <RestaurantMenuOutlinedIcon />,
    link: "/food-item",
  },
  {
    name: "Generate Menu",
    icon: <MenuBookOutlinedIcon />,
    link: "/generate-menu",
  },
  {
    name: "My Profile",
    icon: <AccountBoxIcon />,
    link: "/myprofile",
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MUINavbar() {
  const { id } = useParams();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { data: myData } = useGetMyProfileQuery();
  // const myData = getUserInfo();
  const [trigger, { data: userData }] = useLazyGetUserByIdQuery();
  const [logOut, { data, isSuccess }] = useLogOutMutation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id, trigger]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    logOut();
    removeLevelInfo();
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  };

  const renderList = (data) => {
    return data.map((item) => (
      <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
        <NavLink
          to={item.link}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </NavLink>
      </ListItem>
    ));
  };

  return (
    <>
      {data ? <MUIToast initialValue={true} message={data.message} /> : <></>}
      {isSuccess ? (
        <MUILoading />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Deerwalk Food System
              </Typography>
              {myData && (
                <img
                  src={
                    id
                      ? `http://${userData?.data.profile}`
                      : `http://${myData?.data?.profile}`
                  }
                  alt=""
                  style={{
                    height: "40px",
                    width: "40px",
                    marginRight: "16px",
                    borderRadius: "100%",
                  }}
                />
              )}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <img src="/deerwalklogo.jpeg" alt="" width="170px" />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {myData?.data?.roles?.includes("admin")
                ? renderList(navDataAdmin)
                : renderList(navDataCanteen)}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handleLogOut}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="LogOut"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
}

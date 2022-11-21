import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../httpClient";

import { styled } from "@mui/system";
import {
  Box,
  AppBar,
  IconButton,
  Menu,
  Typography,
  Container,
  Toolbar,
  Button,
  BottomNavigation,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  BottomNavigationAction,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
// import AdbIcon from "@mui/icons-material/Adb";

import {
  StyledHeadingTypography,
  StyledBigHeadingTypography,
} from "../Typography/StyledTypography";
import { StyledAvatarButton } from "../Button/StyledButton";

import SmallLogo from "../../assets/imgs/small-logo.svg";
import "./styles.scss";

const MuiMenu = React.forwardRef((props, ref) => {
  return <Menu ref={ref} {...props} />;
});

const pagesLite = ["play", "about", "pricing", "logout"];
const pages = ["play", "home", "about", "pricing"];
const socialmedias = ["facebook", "instagram", "twitter", "linkedin"];
const settings = ["profile", "logout"];
const drawerWidth = 240;

const StyledAppBar = styled(AppBar)(
  ({ theme }) => `
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
  padding: 0 ${theme.spacing(2)};
  position: fixed;
`
);

const StyledBottomNavigation = styled(BottomNavigation)(
  ({ theme }) => `
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
  padding: 0 ${theme.spacing(2)};
  position: fixed;
`
);

const StyledToolbar = styled(Toolbar)(() => ({
  flexDirection: "row-reverse",
}));

const StyledNavigationBar = ({ picture, fullname }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenHome = () => {
    navigate("/home");
  };

  const handleOpenPlay = () => {
    navigate("/");
  };

  const handleOpenAbout = () => {
    console.log("About - 404 Not Found");
  };

  const handleOpenPricing = () => {
    console.log("Pricing - 404 Not Found");
  };

  const handleClickNavMenu = (key) => {
    switch (key) {
      case "home":
        handleOpenHome();
        break;
      case "play":
        handleOpenPlay();
        break;
      case "about":
        handleOpenAbout();
        break;
      case "pricing":
        handleOpenPricing();
        break;
      default:
        setAnchorElNav(null);
        break;
    }

    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledHeadingTypography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eyedeer.
          </StyledHeadingTypography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StyledHeadingTypography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eyedeer.
          </StyledHeadingTypography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClickNavMenu(page)}
                sx={{
                  my: 2,
                  display: "block",
                  textTransform: "lowercase",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
            <StyledAvatarButton />
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

const StyledHomeNavigationBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <StyledAppBar elevation={0}>
        <StyledToolbar>
          <Button
            color="inherit"
            sx={{ textTransform: "lowercase" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            log in
          </Button>
          <span>/</span>
          <Button
            color="inherit"
            sx={{ textTransform: "lowercase" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            <b>sign up</b>
          </Button>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};

const StyledDashboardNavigationBar = ({ width1, width2 }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenPlay = () => {
    navigate("/");
  };
  const handleOpenAbout = () => {
    console.log("About - 404 Not Found");
  };

  const handleOpenPricing = () => {
    console.log("Pricing - 404 Not Found");
  };

  const handleLogout = () => {
    logoutUser(user, dispatch, navigate);
  };

  const handleClickNavMenu = (key) => {
    switch (key) {
      case "play":
        handleOpenPlay();
        break;
      case "about":
        handleOpenAbout();
        break;
      case "pricing":
        handleOpenPricing();
        break;
      case "logout":
        handleLogout();
        break;
      default:
        setAnchorElNav(null);
        break;
    }

    setAnchorElNav(null);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <StyledHeadingTypography variant="h5" sx={{ textAlign: "center", my: 2 }}>
        eyedeer.
      </StyledHeadingTypography>
      <Divider />
      <List>
        {pagesLite.map((page) => (
          <ListItem key={page} disablePadding>
            <ListItemButton>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <nav id="dashboard-navbar">
      <StyledAppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${width1 + width2 + 24}px)` },
          mr: { md: `${width1 + width2 + 24}px` },
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "none", md: "none" },
                justifyContent: "end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Box
                sx={{
                  display: { xs: "none", sm: "block", md: "block" },
                }}
              >
                {pagesLite.map((page) => (
                  <Box key={page} onClick={() => handleClickNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </Box>
                ))}
              </Box>
              {/* </MuiMenu> */}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  sm: "flex",
                  md: "flex",
                  justifyContent: "space-between",
                },
              }}
            >
              {pagesLite.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleClickNavMenu(page)}
                  sx={{
                    display: "block",
                    textTransform: "lowercase",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <StyledHeadingTypography
              variant={"h5"}
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              eyedeer.
            </StyledHeadingTypography>
            <Box
              sx={{
                display: { xs: "flex", sm: "none", md: "none" },
                mr: 1,
              }}
            >
              <img
                src={SmallLogo}
                alt="small logo"
                draggable={false}
                style={{
                  maxWidth: "32px",
                  maxHeight: "32px",
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 0 }}></Box>
          </StyledToolbar>

          <StyledDashboardBigTitleBar width1={width1} width2={width2} />
        </Container>
      </StyledAppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <StyledToolbar />
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        <StyledToolbar />
        <StyledToolbar />
      </Box>
    </nav>
  );
};

const StyledDashboardBigTitleBar = ({ width1, width2, size }) => {
  return (
    <nav id="dashboard-titlebar">
      <StyledAppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${width1 + width2 + 24}px)` },
          mr: { sm: `${width1 + width2 + 24}px` },
          top: "auto",
          textAlign: "left",
          paddingLeft: "24px",
          display: { xs: "none", sm: "none", md: "flex" },
          flexDirection: "row",
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar
            disableGutters
            sx={{
              flexDirection: "row",
            }}
          >
            <StyledBigHeadingTypography> eyedeer.</StyledBigHeadingTypography>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <StyledToolbar />
      </Box>
    </nav>
  );
};

const StyledFooter = ({ width1, width2 }) => {
  return (
    <Box>
      <StyledBottomNavigation
        showLabels={false}
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${width1 + width2 + 24}px)` },
          mr: { md: `${width1 + width2 + 24}px` },
          px: "48px",
          right: 0,
          bottom: 0,
          height: "32px",
          display: {
            xs: "none",
            sm: "flex",
            md: "flex",
          },
          justifyContent: "space-between !important",
        }}
      >
        {socialmedias.map((socialmedia) => (
          <BottomNavigationAction
            label={socialmedia}
            key={socialmedia}
            showLabel={true}
            sx={{
              display: "block",
              textTransform: "lowercase",
              flex: 0,
            }}
            className="bottom-navigation-socialmedia"
          />
          //   {socialmedia}
          // </BottomNavigationAction>
        ))}
        {/* </Box>
          </StyledToolbar>
        </Container> */}
      </StyledBottomNavigation>
    </Box>
  );
};

export {
  StyledNavigationBar,
  StyledHomeNavigationBar,
  StyledDashboardNavigationBar,
  StyledDashboardBigTitleBar,
  StyledFooter,
};

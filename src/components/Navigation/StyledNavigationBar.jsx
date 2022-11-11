import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";

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
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

import { StyledBigHeadingTypography } from "../Typography/StyledTypography";

import "./styles.scss";

const pages = ["home", "about", "pricing", "logout"];
const socialmedias = ["facebook", "instagram", "twitter", "linkedin"];
const settings = ["profile", "logout"];

const StyledAppBar = styled(AppBar)(
  ({ theme }) => `
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
  padding: 0 ${theme.spacing(2)};
  position: fixed;
`
);

const StyleBottomNavigation = styled(BottomNavigation)(
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

const StyledNavigationBar = () => {
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
      <StyledToolbar />
    </>
  );
};

const StyledDashboardNavigationBar = ({ width1, width2 }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?.user.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };

  const handleOpenNavMenu = (event) => {
    console.log(event);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    console.log("close");
    setAnchorElNav(null);
  };

  const handleClickNavMenu = (key) => {
    switch (key) {
      case "logout":
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
        break;
      default:
        setAnchorElNav(null);
        break;
    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <nav id="dashboard-navbar">
      <StyledAppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${width1 + width2 + 24}px)` },
          mr: { sm: `${width1 + width2 + 24}px` },
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar disableGutters>
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
                  <MenuItem key={page} onClick={() => handleClickNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "space-between",
                },
              }}
            >
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
              </Tooltip> */}
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
              </Menu>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
      <StyledToolbar />
    </nav>
  );
};

const StyledDashboardBigTitleBar = ({ width1, width2 }) => {
  return (
    <nav id="dashboard-titlebar">
      <StyledAppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${width1 + width2 + 24}px)` },
          mr: { sm: `${width1 + width2 + 24}px` },
          top: "auto",
          textAlign: "left",
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar
            disableGutters
            sx={{
              flexDirection: "row",
            }}
          >
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>
            <StyledBigHeadingTypography> eyedeer.</StyledBigHeadingTypography>

            <Box sx={{ flexGrow: 0 }}></Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
      <StyledToolbar />
      <StyledToolbar />
    </nav>
  );
};

const StyledFooter = ({ width1, width2 }) => {
  return (
    <StyleBottomNavigation
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${width1 + width2 + 24}px)` },
        mr: { sm: `${width1 + width2 + 24}px` },
        right: 0,
        bottom: 0,
        height: "32px",
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar
          className="footer-toolbar"
          disableGutters
          sx={{
            flexDirection: "row",
          }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {socialmedias.map((socialmedia) => (
                <MenuItem key={socialmedia}>
                  <Typography textAlign="center">{socialmedia}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-between",
              },
            }}
          >
            {socialmedias.map((socialmedia) => (
              <Button
                key={socialmedia}
                sx={{
                  display: "block",
                  textTransform: "lowercase",
                }}
              >
                {socialmedia}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {socialmedias.map((socialmedia) => (
                <MenuItem key={socialmedia}>
                  <Typography textAlign="center">{socialmedia}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </StyledToolbar>
      </Container>
    </StyleBottomNavigation>
  );
};

export {
  StyledNavigationBar,
  StyledDashboardNavigationBar,
  StyledDashboardBigTitleBar,
  StyledFooter,
};

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
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

import { StyledBigHeadingTypography } from "../Typography/StyledTypography";

import "./styles.scss";

const pages = ["home", "about", "pricing", "logout"];
const settings = ["profile", "logout"];

const StyledAppBar = styled(AppBar)(
  ({ theme }) => `
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
  padding: ${theme.spacing(1)};
  position: fixed;
`
);

const StyledToolbar = styled(Toolbar)(() => ({
  flexDirection: "row-reverse",
}));

const StyledNavigationBar = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <StyledAppBar elevation={0} position="static">
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
    </Box>
  );
};

const StyledDashboardNavigationBar = ({ width1, width2 }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(user, dispatch, navigate);
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
        handleLogout();
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
    </nav>
  );
};

export {
  StyledNavigationBar,
  StyledDashboardNavigationBar,
  StyledDashboardBigTitleBar,
};

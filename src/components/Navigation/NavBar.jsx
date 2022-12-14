import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";

import { styled } from "@mui/system";

import { AvatarButton } from "../Button";
import { StyledHeadingTypography } from "../Typography/StyledTypography";
import { StyledAppBar, StyledToolbar } from "./StyledNavBar";

const pages = ["play", "home", "about", "contact", "pricing"];

// const StyledAppBar = styled(AppBar)(
//   ({ theme }) => `
//   color: ${theme.palette.secondary.contrastText};
//   background-color: ${theme.palette.secondary.main};
//   padding: 0 ${theme.spacing(2)};
//   position: fixed;
// `
// );

// const StyledToolbar = styled(Toolbar)(() => ({
//   flexDirection: "row-reverse",
// }));

const NavBar = () => {
  // const { user } = useSelector((state) => state.auth.user);
  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const handleOpenContact = () => {
    console.log("Contact - 404 Not Found");
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
        break;
        handleOpenAbout();
      case "contact":
        handleOpenContact();
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
    <nav>
      <StyledAppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ px: "24px" }}>
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
                    <Button
                      sx={{
                        display: "block",
                        textTransform: "lowercase",
                        ...(page === "play" && { fontWeight: "bold" }),
                      }}
                      onClick={() => handleClickNavMenu(page)}
                    >
                      {page}
                    </Button>
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
                    ...(page === "play" && { fontWeight: "bold" }),
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <AvatarButton
                picture={user?.picture}
                fullname={`${user?.firstName} ${user?.lastName}`}
              />
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </nav>
  );
};

export { NavBar };

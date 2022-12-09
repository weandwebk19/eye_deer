import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import SmallLogo from "assets/imgs/small-logo.svg";
import PropTypes from "prop-types";
import { logout } from "redux/actions/auth";

import { StyledHeadingTypography } from "../Typography";
import { BigTitleBar } from "./BigTitleBar";
import { StyledAppBar, StyledToolbar } from "./StyledNavBar";
import "./styles.scss";

const pagesLite = ["play", "about", "pricing", "logout"];
const drawerWidth = 240;

const HalfSizeNavBar = ({ width1, width2 }) => {
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

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
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
        break;
    }
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
            <ListItemButton onClick={() => handleClickNavMenu(page)}>
              <ListItemText
                primary={page}
                sx={{ ...(page === "play" && { fontWeight: "bold" }) }}
              />
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
                  <Box
                    key={page}
                    onClick={() => handleClickNavMenu(page)}
                    sx={{ ...(page === "play" && { fontWeight: "bold" }) }}
                  >
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
                    ...(page === "play" && { fontWeight: "bold" }),
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <StyledHeadingTypography
              variant="h5"
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

            <Box sx={{ flexGrow: 0 }} />
          </StyledToolbar>

          <BigTitleBar width1={width1} width2={width2} />
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

HalfSizeNavBar.propTypes = {
  width1: PropTypes.number,
  width2: PropTypes.number,
};

HalfSizeNavBar.defaultProps = {
  width1: 0,
  width2: 0,
};

export { HalfSizeNavBar };

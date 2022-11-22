import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/system";
import {
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { logoutUser } from "../../httpClient";

const StyledPrimaryButton = styled(Button)(
  ({ theme }) => `
  color: ${theme.palette.primary.contrastText};
  background-color: ${theme.palette.primary.main};
  border-radius: 0;
  border: 3px double ${theme.palette.secondary.dark};
  height: 56px;
  text-transform: lowercase;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
  background-color: ${theme.palette.primary.dark};

  };
`
);

const StyledSecondaryButton = styled(Button)(
  ({ theme }) => `
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
  border-radius: 0;
  border: 3px double ${theme.palette.primary.dark};
  height: 56px;
  text-transform: lowercase;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
  background-color: ${theme.palette.secondary.dark};

  };
`
);

const StyledAvatarButton = () => {
  const settings = [
    { routeName: "my profile", onClick: () => handleOpenProfile() },
    { routeName: "logout", onClick: () => handleLogout() },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const user = currentUser?.user;
  const fullname = user.firstName + " " + user.lastName;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleClickUserMenu = (key) => {
  //   switch (key) {
  //     case "profile":
  //       handleOpenProfile();
  //       break;
  //     case "logout":
  //       handleLogout();
  //       break;
  //     default:
  //       setAnchorElNav(null);
  //       break;
  //   }

  //   setAnchorElNav(null);
  // };

  const handleOpenProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logoutUser(currentUser, dispatch, navigate);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          className="avatar-menu"
        >
          <Avatar alt={fullname} src={user?.picture} />
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
          <MenuItem key={setting.routeName} onClick={setting.onClick}>
            <Typography textAlign="center">{setting.routeName}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { StyledPrimaryButton, StyledSecondaryButton, StyledAvatarButton };

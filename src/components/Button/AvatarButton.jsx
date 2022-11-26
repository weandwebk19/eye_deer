import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

const AvatarButton = ({ picture, fullname }) => {
  const settings = [
    { routeName: "my profile", onClick: () => handleOpenProfile() },
    { routeName: "logout", onClick: () => handleLogout() },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const user = currentUser?.user;

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
          <Avatar alt={fullname} src={picture} />
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

export { AvatarButton };

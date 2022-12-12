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

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

import { styled } from "@mui/system";
import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledInputField } from "components/TextField";

import { StyledHeadingTypography } from "../Typography/StyledTypography";

const StyledAppBar = styled(AppBar)(
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

const CustomizerNavBar = ({ left, middle, right }) => {
  // const { user } = useSelector((state) => state.auth.user);
  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;
  const navigate = useNavigate();

  return (
    <nav>
      <StyledAppBar>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <IconButton
              sx={{ mr: 2 }}
              onClick={() => {
                navigate("/group");
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            {left}
            {middle}
            {right}
            {/* <Box sx={{ flexGrow: 1 }}>
              <StyledInputField defaultValue="Hello World" />
            </Box>
            <StyledButton
              sx={{ display: { xs: "none", md: "flex" } }}
              onClick={() => {
                navigate("presenting");
              }}
            >
              <PlayCircleFilledWhiteOutlinedIcon sx={{ mr: 2 }} />
              start present
            </StyledButton>
            <StyledButton
              sx={{ display: { xs: "flex", md: "none", lg: "none" } }}
            >
              <PlayCircleFilledWhiteOutlinedIcon />
            </StyledButton> */}
          </Toolbar>
        </Container>
      </StyledAppBar>
    </nav>
  );
};

CustomizerNavBar.propTypes = {
  left: PropTypes.node,
  middle: PropTypes.node,
  right: PropTypes.node,
};

CustomizerNavBar.defaultProps = {
  left: null,
  middle: null,
  right: null,
};

export { CustomizerNavBar };

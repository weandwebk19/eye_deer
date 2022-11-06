import { useNavigate, useLocation, Link } from "react-router-dom";

import { styled } from "@mui/system";
import { Box, AppBar, Toolbar, Button } from "@mui/material";

import "./style.scss";

const StyledNavigationBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1),
}));

const StyledToolbar = styled(Toolbar)(() => ({
  flexDirection: "row-reverse",
}));

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <StyledNavigationBar elevation={0} position="static">
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
      </StyledNavigationBar>
    </Box>
  );
};

export default NavigationBar;

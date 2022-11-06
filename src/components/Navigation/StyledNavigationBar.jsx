import { useNavigate } from "react-router-dom";

import { styled } from "@mui/system";
import { Box, AppBar, Toolbar, Button } from "@mui/material";

import "./styles.scss";

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

export default StyledNavigationBar;

import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { StyledAppBar, StyledToolbar } from "./StyledNavBar";
import "./styles.scss";

const UnregisteredNavBar = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export { UnregisteredNavBar };

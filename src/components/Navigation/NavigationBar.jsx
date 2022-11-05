import { styled } from "@mui/system";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

import "./style.scss";

const StyledNavigationBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1),
}));

const StyledToolbar = styled(Toolbar)(() => ({
  flexDirection: "row-reverse",
}));

export default function NavigationBar() {
  return (
    <Box>
      <StyledNavigationBar elevation={0} position="static">
        <StyledToolbar>
          <Button color="inherit" sx={{ textTransform: "lowercase" }}>
            log in
          </Button>
          <span>/</span>
          <Button color="inherit" sx={{ textTransform: "lowercase" }}>
            <b>sign up</b>
          </Button>
        </StyledToolbar>
      </StyledNavigationBar>
    </Box>
  );
}

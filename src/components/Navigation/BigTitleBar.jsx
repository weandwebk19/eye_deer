import { Box, Container } from "@mui/material";

import { StyledAppBar, StyledToolbar } from "./NavBar";

import { StyledBigHeadingTypography } from "../Typography";

const BigTitleBar = ({ width1, width2, size }) => {
  return (
    <nav id="dashboard-titlebar">
      <StyledAppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${width1 + width2 + 24}px)` },
          mr: { sm: `${width1 + width2 + 24}px` },
          top: "auto",
          textAlign: "left",
          paddingLeft: "24px",
          display: { xs: "none", sm: "none", md: "flex" },
          flexDirection: "row",
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar
            disableGutters
            sx={{
              flexDirection: "row",
            }}
          >
            <StyledBigHeadingTypography> eyedeer.</StyledBigHeadingTypography>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <StyledToolbar />
      </Box>
    </nav>
  );
};

export { BigTitleBar };

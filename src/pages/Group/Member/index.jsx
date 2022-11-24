import { Box, Container, Grid } from "@mui/material";
import { NavBar } from "components/Navigation";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";
import { SearchField } from "components/Textbox";
import { StyledButton } from "components/Button";

import MemberList from "./MemberList";
import MemberSideSection from "./MemberSideSection";

// import "../styles.scss";

const Member = () => {
  return (
    <Box sx={{ display: "flex", overflow: "hidden !important" }}>
      <NavBar />

      <Container
        component="main"
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "64px",
        }}
      >
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          height="100vh"
        >
          <Grid item xs={4} sm={4} md={9} lg={9} id="main-area" p={3}>
            <StyledHeadingTypography variant="h2">
              group's name: Kim chi đỏ au, thơm phức, dí hà
            </StyledHeadingTypography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <SearchField />
              <StyledButton>generate invitation link</StyledButton>
            </Box>
            <MemberList />
          </Grid>
          <Grid item xs={4} sm={4} md={3} lg={3} id="side-area" p={3}>
            <MemberSideSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Member;

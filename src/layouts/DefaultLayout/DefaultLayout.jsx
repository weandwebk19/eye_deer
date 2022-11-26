import { Box, Container, Grid } from "@mui/material";

import PropTypes from "prop-types";

import { NavBar } from "components/Navigation";
import { StyledHeadingTypography } from "components/Typography";

const DefaultLayout = ({ name = "", mainSection, sideSection }) => {
  return (
    <Box sx={{ display: "flex" }}>
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
        <NavBar />
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          height="100vh"
        >
          <Grid item xs={4} sm={4} md={7} lg={9} id="main-area" p={3}>
            <StyledHeadingTypography variant="h2">
              {name}
            </StyledHeadingTypography>

            <StyledHeadingTypography variant="h5">
              chapter.
            </StyledHeadingTypography>
            <Box className="main-content">{mainSection}</Box>
          </Grid>
          <Grid item xs={4} sm={4} md={5} lg={3} id="side-area" p={3}>
            {sideSection}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

DefaultLayout.propTypes = {
  name: PropTypes.string,
  mainSection: PropTypes.node.isRequired,
  sideSection: PropTypes.node.isRequired,
};

DefaultLayout.defaultProps = {
  name: "",
};

export default DefaultLayout;

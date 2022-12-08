import { Box, Container, CssBaseline, Grid } from "@mui/material";

import PropTypes from "prop-types";

import { NavBar } from "components/Navigation";

import "./styles.scss";

const FluidLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Container
        id="fluid-layout-container"
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <NavBar />
        <CssBaseline />
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          sx={{
            pt: "70px",
            height: "100vh",
          }}
        >
          <Grid
            item
            xs={4}
            sm={8}
            md={7}
            lg={9}
            id="main-area"
            p={3}
            sx={{
              height: "calc(100vh - 70px)",
              overflowY: "scroll !important",
            }}
          >
            {(() => {
              if (Array.isArray(children)) {
                return children[0];
              }
              return children;
            })()}
          </Grid>
          <Grid
            item
            xs={4}
            sm={8}
            md={5}
            lg={3}
            id="side-area"
            p={3}
            sx={{
              height: "100vh",
            }}
          >
            {(() => {
              if (Array.isArray(children)) {
                return children[1];
              }
            })()}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

FluidLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default FluidLayout;

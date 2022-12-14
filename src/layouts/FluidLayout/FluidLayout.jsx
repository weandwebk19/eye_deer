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
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        {/* <NavBar /> */}
        <CssBaseline />

        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          sx={{
            pt: "65px",
            height: "100vh",
          }}
        >
          <Grid
            item
            xs={4}
            sm={8}
            md={2}
            lg={2}
            id="fluid-layout__left"
            p={3}
            sx={{
              height: "calc(100vh - 65px)",
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
            md
            lg
            id="fluid-layout__main"
            p={3}
            sx={{
              height: "calc(100vh - 65px)",
              overflowY: "scroll !important",
            }}
          >
            {(() => {
              if (Array.isArray(children)) {
                return children[1];
              }
              return children;
            })()}
          </Grid>
          <Grid
            item
            xs={4}
            sm={8}
            md="auto"
            lg="auto"
            id="fluid-layout__right"
            p={3}
            sx={{
              height: "100vh",
            }}
          >
            {(() => {
              if (Array.isArray(children)) {
                return children[2];
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

export { FluidLayout };

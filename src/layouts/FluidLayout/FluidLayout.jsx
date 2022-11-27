import { Fragment } from "react";

import { Box, Container, Grid } from "@mui/material";

import PropTypes from "prop-types";

import { NavBar } from "components/Navigation";

const FluidLayout = ({ children }) => {
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
          <Grid item xs={4} sm={5} md={7} lg={9} id="main-area" p={3}>
            {(() => {
              if (Array.isArray(children)) {
                return children[0];
              }
              return children;
            })()}
          </Grid>
          <Grid item xs={4} sm={3} md={5} lg={3} id="side-area" p={3}>
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

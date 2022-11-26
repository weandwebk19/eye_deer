import { Box, Container, Grid } from "@mui/material";

import PropTypes from "prop-types";

import { NavBar } from "components/Navigation";

const DefaultLayout = ({ children }) => {
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
          justifyContent="center"
        >
          {children}
        </Grid>
      </Container>
    </Box>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;

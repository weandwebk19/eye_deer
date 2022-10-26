import { useState } from "react";
import RegisterCard from "./RegisterCard";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Register = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          p={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <RegisterCard className="role__card--teacher" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          p={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <RegisterCard className="role__card--student" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;

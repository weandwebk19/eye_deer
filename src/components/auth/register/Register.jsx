import { useEffect } from "react";
import axios from "axios";

import RegisterCard from "./RegisterCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const roles = { teacher: 0, student: 1 };

const Register = () => {
  // useEffect(() => {}, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        {Object.keys(roles).map((role, i) => {
          return (
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
              <RegisterCard role={roles[role]} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
  // <Box sx={{ flexGrow: 1 }}>
  //   <Grid container>
  //     <Grid
  //       item
  //       xs={12}
  //       sm={6}
  //       md={6}
  //       p={3}
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //     >
  //       <RegisterCard className="role__card--teacher" />
  //     </Grid>
  //     <Grid
  //       item
  //       xs={12}
  //       sm={6}
  //       md={6}
  //       p={3}
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //     >
  //       <RegisterCard className="role__card--student" />
  //     </Grid>
  //   </Grid>
  // </Box>
};

export default Register;

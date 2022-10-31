import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

import RegisterCard from "./RegisterCard";

import { Box, Grid, Typography } from "@mui/material";

const RegisterHome = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/role/roles`
      )
      .then((response) => {
        setRoles(response.data);
      });
  }, []);

  return (
    <>
      <Box className="register-container" sx={{ flexGrow: 1 }}>
        <main>
          {/* Hero unit */}
          <div>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Choose your account type
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              component="p"
            >
              The Alpha Deer is Teacher
              <br />
              The Deer is Student
            </Typography>
          </div>
          {/* End hero unit */}
        </main>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {roles.map((role, i) => {
            return (
              <Grid item xs={12} sm={6} md={2.5} key={i}>
                <Link
                  to={`${
                    role.id === 1 ? "/register/form" : "/register/birthday"
                  }`}
                  state={{ role: role.id }}
                >
                  <RegisterCard role={role.id} />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default RegisterHome;

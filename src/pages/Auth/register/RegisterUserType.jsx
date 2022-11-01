import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Grid, Typography, Button } from "@mui/material";

import RegisterCard from "./RegisterCard";

const RegisterUserType = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/workplace/workplaces`
      )
      .then((response) => {
        setWorkplaces(response.data);
      });
  }, []);

  const handleNavigate = () => {
    const path = "/register/form";
    navigate(path, { state: { workplace: null, role: state.role } });
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                Describe your workplace
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
            {workplaces.map((workplace, i) => {
              return (
                <Grid item xs={12} sm={6} md={2.5} key={i}>
                  <Link
                  to="/register/form"
                  state={{ workplace: workplace.id }}
                  >
                    <RegisterCard cardItem={workplace} />
                  </Link>
                </Grid>
              );
            })}
          </Grid>
          <Button variant="contained" onClick={handleNavigate}>
            Other
          </Button>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default RegisterUserType;

<<<<<<< HEAD
import { useQuery } from "react-query";
=======
import { useState, useEffect } from "react";
import { QueryClient,useQueryClient, QueryClientProvider, useQuery } from "react-query";
>>>>>>> parent of d1d360f (cleaning some comments)
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Grid, Typography, Button } from "@mui/material";

import RegisterCard from "./RegisterCard";

const RegisterUserType = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // const queryClient = new QueryClient();
  const useWorkplaces = ()=>{
    return useQuery(["workplace"], async()=>{
      const {data} = await axios.get(`${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/workplace/workplaces`);
      return data
    })
  }
  const { isLoading, error, data, isFetching } = useWorkplaces();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/workplace/workplaces`
  //     )
  //     .then((response) => {
  //       setWorkplaces(response.data);
  //     });
  // }, []);

  const handleNavigate = () => {
    const path = "/register/form";
    navigate(path, { state: { workplace: null, role: state.role } });
  };

  return (
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
              {data.map((workplace, i) => {
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
              <div>{isFetching ? "Updating..." : ""}</div>
          </Grid>
          <Button variant="contained" onClick={handleNavigate}>
            Other
          </Button>
        </Box>
      </LocalizationProvider>
  );
};

export default RegisterUserType;

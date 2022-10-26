import { useEffect, useState } from "react";
import axios from "axios";

import RegisterCard from "./RegisterCard";
import RegisterInstantMessage from "./RegisterInstantMessage";

import {
  Alert,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Register = () => {
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // axios
    //   .get(
    //     `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}`
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });
  }, []);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 3000);
    }
  }, [isError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password"),
    };
    axios
      .post(
        `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/auth/register`,
        formData
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("success");
          setMessage("Successfully register! 🤗");
          setIsError(false);
        } else {
          console.log("error");
          setMessage("Oops! Something went wrong! 😅");
          setIsError(true);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {isError === false ? (
        <RegisterInstantMessage variant={"success"} message={message} />
      ) : isError === true ? (
        <RegisterInstantMessage variant={"error"} message={message} />
      ) : (
        ""
      )}
    </ThemeProvider>
  );
  //   <Box sx={{ flexGrow: 1 }}>
  //     <Grid container>
  //       {Object.keys(roles).map((role, i) => {
  //         return (
  //           <Grid
  //             item
  //             xs={12}
  //             sm={6}
  //             md={6}
  //             p={3}
  //             display="flex"
  //             justifyContent="center"
  //             alignItems="center"
  //           >
  //             <RegisterCard role={roles[role]} />
  //           </Grid>
  //         );
  //       })}
  //     </Grid>
  //   </Box>
};

export default Register;

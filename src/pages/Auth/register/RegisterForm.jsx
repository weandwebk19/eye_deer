import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/apiRequest";

import InstantMessage from "../../../components/InstantMessage";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const RegisterForm = () => {
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // data.birthday = state.birthday? `${state.birthday.$y}-${state.birthday.$M + 1}-${state.birthday.$D}`: null;
    data.birthday = state.birthday;
    data.roleId = state.role;
    data.workplaceId = state.workplace;
    const res = await registerUser(data, dispatch, navigate);
    if(res) {
      if(res.success === true) {
        setMessage(res.message);
        setIsError(false);
      }
      else {
        setMessage(res.message);
        setIsError(true);
      }
    }
    else {
      setMessage("Oops! Something went wrong! 😅");
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 3000);
    }
  }, [isError]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const formData = {
  //     email: data.get("email"),
  //     username: data.get("username"),
  //     password: data.get("password"),
  //   };
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/auth/register`,
  //       formData
  //     )
  //     .then((response) => {
  //       if (response.status === 201) {
  //         console.log("success");
  //         setMessage("Successfully register! 🤗");
  //         setIsError(false);
  //       } else {
  //         console.log("error");
  //         setMessage("Oops! Something went wrong! 😅");
  //         setIsError(true);
  //       }
  //     });
  // };

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
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register("username", {
                    validate: (value) => value !== "admin" || "Nice try!",
                  })}
                />
                {errors.username && errors.username.message}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                {errors.email && errors.email.message}
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
                  {...register("password", {
                    required: "Required",
                    pattern: {
                      // Minimum eight and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,20}$/i,
                      message:
                        "password must contain at least 8 characters, at most 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                    },
                  })}
                />
                {errors.password && errors.password.message}
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
        <InstantMessage variant={"success"} message={message} />
      ) : isError === true ? (
        <InstantMessage variant={"error"} message={message} />
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

export default RegisterForm;

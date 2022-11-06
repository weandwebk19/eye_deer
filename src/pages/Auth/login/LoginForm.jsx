import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/apiRequest";

import InstantMessage from "../../../components/Popup/InstantMessage";
import StyledPaper from "../../../components/Paper/StyledPaper";
import { StyleHeadingTypography } from "../../../components/Typography/StyledTypography";
import StyledPrimaryButton from "../../../components/Button/StyledPrimaryButton";
import {
  StyledInputField,
  customTheme,
} from "../../../components/Textbox/StyledInputField";

import GoogleAuthButton from "./GoogleAuthButton";

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

const LoginForm = () => {
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await loginUser(data, dispatch, navigate);
    if (res) {
      setMessage("Successfully login! 🤗");
      setIsError(false);
    } else {
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

  // const loginWithGoogle = () => {
  //   window.open(`${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/auth/google`,
  //   '_blank', 'toolbar=0,location=0,menubar=0');
  // }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledPaper
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StyleHeadingTypography variant="h3" gutterBottom>
            log in.
          </StyleHeadingTypography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledInputField
                  className="textfield"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  {...register("username", {
                    required: "Required",
                  })}
                />
                {errors.username && errors.username.message}
              </Grid>
              <Grid item xs={12}>
                <ThemeProvider theme={customTheme}>
                  <StyledInputField
                    className="textfield"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Required",
                    })}
                  />
                </ThemeProvider>
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
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  don't have an account? <b>sign up</b>
                </Link>
              </Grid>
            </Grid>
            <GoogleAuthButton />
          </Box>
        </StyledPaper>
      </Container>
      {isError === false ? (
        <InstantMessage variant={"success"} message={message} />
      ) : isError === true ? (
        <InstantMessage variant={"error"} message={message} />
      ) : (
        ""
      )}
    </>
  );
};

export default LoginForm;

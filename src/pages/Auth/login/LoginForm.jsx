import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../httpClient";

import {
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { InstantMessage } from "components/Popup";
import { StyledPaper } from "components/Paper";
import { StyledHeadingTypography } from "components/Typography";
import { StyledButton } from "components/Button";
import {
  StyledInputField,
  customTheme,
} from "components/TextField/StyledInputField";

import GoogleAuthButton from "./GoogleAuthButton";

import Gradient6 from "../../../assets/imgs/gradient-6.png";

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

    setMessage(res.message);
    if (res && res.success === true) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  }, [isError]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <StyledPaper
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StyledHeadingTypography variant="h3" gutterBottom>
            log in.
          </StyledHeadingTypography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ThemeProvider theme={customTheme}>
                  <StyledInputField
                    variant="light"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    {...register("username", {
                      required: "required",
                      // validate: (value) => value !== "admin" || "nice try!",
                    })}
                  />
                </ThemeProvider>
                {errors.username ? (
                  <>
                    {errors.username.type === "required" && (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                          position: "absolute",
                        }}
                      >
                        {errors.username.message}
                      </div>
                    )}
                    {/* {errors.username.type === "validate" && (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                          position: "absolute",
                        }}
                      >
                        {errors.username.message}
                      </div>
                    )} */}
                  </>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <ThemeProvider theme={customTheme}>
                  <StyledInputField
                    sx={{ mt: 2 }}
                    variant="light"
                    required
                    fullWidth
                    name="password"
                    label="password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "required",
                    })}
                  />
                </ThemeProvider>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {errors.password ? (
                      <>
                        {errors.password.type === "required" && (
                          <div
                            style={{
                              color: "darkred",
                              fontSize: "0.88rem",
                              position: "absolute",
                            }}
                          >
                            {errors.password.message}
                          </div>
                        )}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              variant="primary"
              sx={{ mt: 6 }}
            >
              Log In
            </StyledButton>
            <Typography sx={{ mt: 4, mb: 4, textAlign: "center" }}>
              or
            </Typography>
            <GoogleAuthButton />
            <Grid
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ mt: 6 }}
            >
              <Grid item>
                <Link href="/register" variant="body2">
                  don't have an account? <b>sign up</b>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>
        <img src={Gradient6} alt="deco gradient" className="deco-img-61" />
        <img src={Gradient6} alt="deco gradient" className="deco-img-62" />
      </Container>
      {isError === false ? (
        <InstantMessage variant={"success"} message={message} />
      ) : isError === true ? (
        <InstantMessage variant={"error"} message={message} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default LoginForm;

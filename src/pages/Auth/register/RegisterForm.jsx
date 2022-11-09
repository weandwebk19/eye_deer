import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/apiRequest";

import { CssBaseline, Link, Grid, Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// import { ThemeProvider } from "@mui/material/styles";
import InstantMessage from "../../../components/Popup/InstantMessage";
import StyledPaper from "../../../components/Paper/StyledPaper";
import { StyledHeadingTypography } from "../../../components/Typography/StyledTypography";
import StyledPrimaryButton from "../../../components/Button/StyledPrimaryButton";
import {
  StyledInputField,
  customTheme,
} from "../../../components/Textbox/StyledInputField";

// import GoogleAuthButton from "./GoogleAuthButton";

import Gradient6 from "../../../assets/imgs/gradient-6.png";

const RegisterForm = () => {
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");

  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    data.birthday = state.birthday;
    data.roleId = state.role;
    data.workplaceId = state.workplace;
    data.email = user?.email;
    data.picture = user?.picture;
    data.firstName = user?.given_name;
    data.lastName = user?.family_name;
    const res = await registerUser(data, dispatch, navigate);
    console.log(res)
    if (res) {
      if (res.success === true) {
        setMessage(res.message);
        setIsError(false);
      } else {
        setMessage(res.message);
        setIsError(true);
      }
    } else {
      setMessage("oops! Something went wrong! 😅");
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

  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
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
              width: "100%",
            }}
          >
            <StyledHeadingTypography variant="h3" gutterBottom>
              sign up.
            </StyledHeadingTypography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container columns={{ xs: 4, sm: 8, md: 8 }} spacing={3}>
                {/* Start: Lastname */}
                {user?.family_name === undefined ? (
                  <Grid item xs={8} sm={4} md={4}>
                    <ThemeProvider theme={customTheme}>
                      <StyledInputField
                        variant="light"
                        fullWidth
                        id="lastname"
                        label="last name"
                        name="lastName"
                        autoComplete="lastName"
                        {...register("lastName", {
                          required: false,
                          pattern: {
                            value: /^[a-zA-Z ]*$/i,
                            message: "wrong format!",
                          },
                        })}
                      />
                    </ThemeProvider>
                    {errors.lastName ? (
                      <>
                        {errors.lastName.type === "pattern" && (
                          <div
                            style={{
                              color: "darkred",
                              fontSize: "0.88rem",
                              position: "absolute",
                            }}
                          >
                            {errors.lastName.message}
                          </div>
                        )}
                      </>
                    ) : null}
                  </Grid>
                ) : null}
                {/* End: lastname */}

                {/* Start: firstname */}
                {user?.given_name === undefined ? (
                  <Grid item xs={8} sm={4} md={4}>
                    <ThemeProvider theme={customTheme}>
                      <StyledInputField
                        variant="light"
                        fullWidth
                        id="firstname"
                        label="first name"
                        name="firstName"
                        autoComplete="firstName"
                        {...register("firstName", {
                          required: false,
                          pattern: {
                            value: /^[a-zA-Z ]*$/i,
                            message: "wrong format!",
                          },
                        })}
                      />
                    </ThemeProvider>
                    {errors.firstName ? (
                      <>
                        {errors.firstName.type === "pattern" && (
                          <div
                            style={{
                              color: "darkred",
                              fontSize: "0.88rem",
                              position: "absolute",
                            }}
                          >
                            {errors.firstName.message}
                          </div>
                        )}
                      </>
                    ) : null}
                  </Grid>
                ) : null}
                {/* End: firstname */}

                {/* Start: username */}
                <Grid item xs={8} sm={8} md={8}>
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
                      {errors.username.type === "validate" && (
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
                    </>
                  ) : null}
                </Grid>
                {/* End: username */}

                {/* Start: email */}
                {user?.email === undefined ? (
                  <Grid item xs={8} sm={8} md={8}>
                    <ThemeProvider theme={customTheme}>
                      <StyledInputField
                        variant="light"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        {...register("email", {
                          required: "required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                    </ThemeProvider>
                    {errors.email ? (
                      <>
                        {errors.email.type === "required" && (
                          <div
                            style={{
                              color: "darkred",
                              fontSize: "0.88rem",
                              position: "absolute",
                            }}
                          >
                            {errors.email.message}
                          </div>
                        )}
                        {errors.email.type === "pattern" && (
                          <div
                            style={{
                              color: "darkred",
                              fontSize: "0.88rem",
                              position: "absolute",
                            }}
                          >
                            {errors.email.message}
                          </div>
                        )}
                      </>
                    ) : null}
                  </Grid>
                ) : null}
                {/* End: email */}

                {/* Start: Password */}
                <Grid item xs={8} sm={4} md={4}>
                  <ThemeProvider theme={customTheme}>
                    <StyledInputField
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
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i,
                          message: `password must be 8-16 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                        },
                      })}
                    />
                  </ThemeProvider>
                  <Grid item>
                    {errors.password ? (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                        }}
                      >
                        {errors.password.message}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                {/* End: Password */}

                {/* Start: Confirm password */}
                <Grid item xs={8} sm={4} md={4}>
                  <ThemeProvider theme={customTheme}>
                    <StyledInputField
                      variant="light"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="confirm password"
                      type="password"
                      id="confirm-password"
                      autoComplete="confirm-password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) => {
                          if (watch("password") !== value) {
                            return "passwords do no match";
                          }
                        },
                      })}
                    />
                  </ThemeProvider>
                  <Grid item>
                    {errors.confirmPassword ? (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                          position: "absolute",
                        }}
                      >
                        {errors.confirmPassword.message}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                {/* End: Confirm password */}
              </Grid>
              <StyledPrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 6 }}
              >
                sign up
              </StyledPrimaryButton>

              <Grid
                container
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ mt: 6 }}
              >
                <Grid item>
                  <Link href="/login" variant="body2">
                    already have an account? <b>login</b>
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
    </>
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

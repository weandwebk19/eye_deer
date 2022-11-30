import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Container, CssBaseline, Grid, Link } from "@mui/material";

import Gradient6 from "assets/imgs/gradient-6.png";
import { loginUser, registerUser } from "httpClient";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import {
  StyledInputField,
  customTheme,
} from "components/TextField/StyledInputField";
import { StyledHeadingTypography } from "components/Typography";

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
    try {
      data.birthday = state.birthday;
      data.workplaceId = state.workplace;
      data.email = data.email ?? user?.email;
      data.picture = user?.picture;
      data.firstName = data.firstName ?? user?.given_name;
      data.lastName = data.lastName ?? user?.family_name;
      const res = await registerUser(data, dispatch, navigate).catch((err) => {
        setMessage(err.message);
        setIsError(true);
      });

      if (res.success === true) {
        setMessage(res.message);
        setIsError(false);
        const login = await loginUser(data, dispatch);

        setMessage(login.message);
        if (login && login.success === true) {
          setIsError(false);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          setIsError(true);
        }
      } else {
        setMessage(res.message);
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
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
    <Box>
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
                    <StyledInputField
                      variant="outlined"
                      customvariant="light"
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
                    {errors.lastName ? (
                      <div className="error-message-validate">
                        {errors.lastName.message}
                      </div>
                    ) : null}
                  </Grid>
                ) : (
                  <Grid item xs={8} sm={4} md={4}>
                    <StyledInputField
                      variant="outlined"
                      customvariant="light"
                      fullWidth
                      id="lastname"
                      label="last name"
                      name="lastName"
                      defaultValue={user.family_name}
                      autoComplete="lastName"
                      {...register("lastName", {
                        required: false,
                      })}
                    />
                  </Grid>
                )}
                {/* End: lastname */}

                {/* Start: firstname */}
                {user?.given_name === undefined ? (
                  <Grid item xs={8} sm={4} md={4}>
                    <StyledInputField
                      variant="outlined"
                      customvariant="light"
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
                    {errors.firstName ? (
                      <div className="error-message-validate">
                        {errors.firstName.message}
                      </div>
                    ) : null}
                  </Grid>
                ) : (
                  <Grid item xs={8} sm={4} md={4}>
                    <StyledInputField
                      variant="outlined"
                      customvariant="light"
                      fullWidth
                      id="firstname"
                      label="first name"
                      name="firstName"
                      defaultValue={user.given_name}
                      autoComplete={user.given_name}
                      {...register("firstName", {
                        required: false,
                      })}
                    />
                  </Grid>
                )}
                {/* End: firstname */}

                {/* Start: username */}
                <Grid item xs={8} sm={8} md={8}>
                  <StyledInputField
                    variant="outlined"
                    customvariant="light"
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
                  {errors.username ? (
                    <div className="error-message-validate">
                      {errors.username.message}
                    </div>
                  ) : null}
                </Grid>
                {/* End: username */}

                {/* Start: email */}
                {user?.email === undefined ? (
                  <Grid item xs={8} sm={8} md={8}>
                    <StyledInputField
                      variant="outlined"
                      customvariant="light"
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
                    {errors.email ? (
                      <div className="error-message-validate">
                        {errors.email.message}
                      </div>
                    ) : null}
                  </Grid>
                ) : null}
                {/* End: email */}

                {/* Start: Password */}
                <Grid item xs={8} sm={4} md={4}>
                  <StyledInputField
                    variant="outlined"
                    customvariant="light"
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
                  <StyledInputField
                    variant="outlined"
                    customvariant="light"
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
                          return "passwords do not match";
                        }
                      },
                    })}
                  />
                  <Grid item>
                    {errors.confirmPassword ? (
                      <div className="error-message-validate">
                        {errors.confirmPassword.message}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                {/* End: Confirm password */}
              </Grid>
              <StyledButton
                type="submit"
                fullWidth
                variant="primary"
                sx={{ mt: 6 }}
              >
                sign up
              </StyledButton>

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
        {(() => {
          if (isError === false) {
            return <InstantMessage variant="success" message={message} />;
          } else if (isError === true) {
            return <InstantMessage variant="error" message={message} />;
          }
          return "";
        })()}
      </Box>
    </Box>
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

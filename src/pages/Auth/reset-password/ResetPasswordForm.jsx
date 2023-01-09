import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import Gradient6 from "assets/imgs/gradient-6.png";
import { login } from "redux/actions/auth";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import { StyledInputField } from "components/TextField/StyledInputField";
import { StyledHeadingTypography } from "components/Typography";
import UserService from "services/userService";

const ResetPasswordForm = () => {
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const {token} = params;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      // call api to reset password
      const {password} = data;
      const res = await UserService.resetPassword(token, password);

      // handle res
      if (res.success === true) {
        setMessage(res.message);
        setIsError(false);
        setTimeout(()=>{
          navigate("/login");
        }, 1000)
      } else {
        setMessage(res.message);
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
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
            reset password.
          </StyledHeadingTypography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledInputField
                  variant="outlined"
                  customvariant="light"
                  required
                  fullWidth
                  id="password"
                  label="new-password"
                  name="password"
                  type="password"
                  autoComplete="password"
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
                        marginTop: "5px",
                      }}
                    >
                      {errors.password.message}
                    </div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <StyledInputField
                  sx={{ mt: 2 }}
                  variant="outlined"
                  customvariant="light"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirm-password"
                  type="password"
                  id="confirmPassword"
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
                  <div
                    style={{
                      color: "darkred",
                      fontSize: "0.88rem",
                      marginTop: "5px",
                    }}
                  >
                    {errors.confirmPassword.message}
                  </div>
                ) : null}
                </Grid>
              </Grid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              variant="primary"
              sx={{ mt: 6 }}
            >
              reset password
            </StyledButton>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ mt: 6 }}
            >
              <Grid item>
                <Link href="/login" variant="body2">
                  have you already an account? <b>log in</b>
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
      })()}
    </Box>
  );
};

export default ResetPasswordForm;

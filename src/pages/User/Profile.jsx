import { NavBar } from "components/Navigation/NavBar";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";
import { StyledButton } from "components/Button";
import {
  CssBaseline,
  Link,
  Grid,
  Box,
  Container,
  Avatar,
  Divider,
} from "@mui/material";
import { InstantMessage } from "components/Popup/InstantMessage";
import { ThemeProvider } from "@mui/material/styles";
import {
  StyledInputField,
  customTheme,
} from "components/Textbox/StyledInputField";

import defaultAvatar from "assets/imgs/avatar.jpg";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUserByUsername, updateProfileUser } from "httpClient";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const user = currentUser?.user;
  const username = user.username;
  //preview avatar
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false);

  //form
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (userInfo) => {
    userInfo.avatarFile = selectedFile;
    userInfo.isDeleteAvatar = isDeleteAvatar;

    //call api here
    const res = await updateProfileUser(currentUser, userInfo, dispatch).catch(
      (err) => {
        setMessageFromServer(err.message);
        setIsError(true);
      }
    );

    if (res.success === true) {
      setMessageFromServer(res.message);
      setIsError(false);
    } else {
      setMessageFromServer(res.message);
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

  // preview avatar when changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  //get user info
  useEffect(() => {
    (async () => {
      const userInfo = await getUserByUsername(currentUser, dispatch).catch(
        (error) => {
          console.log(error);
        }
      );

      setPreview(userInfo.picture);
      reset({
        username: userInfo.username,
        lastName: userInfo.lastName,
        firstName: userInfo.firstName,
        email: userInfo.email,
      });
    })();
  }, []);

  return (
    <Box className="profile-container">
      <NavBar />

      <CssBaseline />
      <Container
        component="main"
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        //className="profile-container"
      >
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          height="100vh"
          spacing={4}
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            justifyContent: "center",
          }}
          className="profile-form"
        >
          <Grid
            item
            xs={4}
            sm={8}
            md={3}
            sx={{ display: "flex", flexDirection: "column" }}
            className="profile-form__item profile-form-avatar"
          >
            <StyledHeadingTypography variant="h4" className="text-stroke">
              avatar.
            </StyledHeadingTypography>
            <Box sx={{ flexGrow: 1 }}>
              <Avatar
                src={preview || defaultAvatar}
                alt="avatar"
                variant="rounded"
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  marginTop: "64px",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Grid
                container
                columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}
                spacing={2}
                // mb={0}
              >
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <StyledButton
                    variant="secondary"
                    onClick={() => {
                      setSelectedFile(undefined);
                      setIsDeleteAvatar(true);
                    }}
                    sx={{ width: "100%" }}
                  >
                    Delete Avatar
                  </StyledButton>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <StyledButton component="label" sx={{ width: "100%" }}>
                    Change Avatar
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={onSelectFile}
                    />
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <StyledSecondaryButton
                onClick={() => {
                  setSelectedFile(undefined);
                  setIsDeleteAvatar(true);
                }}
              >
                Delete Avatar
              </StyledSecondaryButton>
              <StyledPrimaryButton component="label">
                Change Avatar
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onSelectFile}
                />
              </StyledPrimaryButton>
            </Box> */}
          </Grid>

          <Grid
            item
            xs={4}
            sm={8}
            md={5}
            sx={{ display: "flex", flexDirection: "column" }}
            className="profile-form__item profile-form-info"
          >
            <StyledHeadingTypography variant="h4" className="text-stroke">
              user's profile.
            </StyledHeadingTypography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                columns={{ xs: 4, sm: 8, md: 8 }}
                spacing={3}
                sx={{
                  marginTop: "40px",
                }}
              >
                {/* Start: Lastname */}
                <Grid item xs={8} sm={4} md={4}>
                  <ThemeProvider theme={customTheme}>
                    <StyledInputField
                      fullWidth
                      id="lastname"
                      label="lastname"
                      name="lastName"
                      autoComplete="lastName"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("lastName", {
                        required: "required",
                        pattern: {
                          value: /^[a-zA-Z ]*$/i,
                          message: "wrong format!",
                        },
                      })}
                    />
                  </ThemeProvider>
                  {errors.lastName ? (
                    <div
                      style={{
                        color: "darkred",
                        fontSize: "0.88rem",
                        position: "absolute",
                      }}
                    >
                      {errors.lastName.message}
                    </div>
                  ) : null}
                </Grid>
                {/* End: lastname */}

                {/* Start: firstname */}
                <Grid item xs={8} sm={4} md={4}>
                  <ThemeProvider theme={customTheme}>
                    <StyledInputField
                      fullWidth
                      id="firstname"
                      label="first name"
                      name="firstName"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      autoComplete="firstName"
                      {...register("firstName", {
                        required: "required",
                        pattern: {
                          value: /^[a-zA-Z ]*$/i,
                          message: "wrong format!",
                        },
                      })}
                    />
                  </ThemeProvider>
                  {errors.firstName ? (
                    <div
                      style={{
                        color: "darkred",
                        fontSize: "0.88rem",
                        position: "absolute",
                      }}
                    >
                      {errors.firstName.message}
                    </div>
                  ) : null}
                </Grid>

                {/* End: firstname */}

                {/* Start: username */}
                <Grid item xs={8} sm={8} md={8}>
                  <ThemeProvider theme={customTheme}>
                    <StyledInputField
                      required
                      fullWidth
                      id="username"
                      label="username"
                      name="username"
                      autoComplete="username"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("username")}
                    />
                  </ThemeProvider>
                </Grid>
                {/* End: username */}

                {/* Start: email */}
                <Grid item xs={8} sm={8} md={8}>
                  <ThemeProvider theme={customTheme}>
                    <StyledInputField
                      required
                      fullWidth
                      id="email"
                      label="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                {/* End: email */}

                <Grid item xs={8}>
                  <Divider textAlign="left" className="text-stroke">
                    provide password to verify
                  </Divider>
                </Grid>

                {/* Start: current password */}
                <Grid item xs={8} sm={8} md={8}>
                  <ThemeProvider theme={customTheme}>
                    <StyledInputField
                      required
                      fullWidth
                      name="currentPassword"
                      label="password"
                      type="password"
                      id="current-password"
                      autoComplete="current-password"
                      {...register("currentPassword", {
                        required: "required",
                        // pattern: {
                        //   value:
                        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i,
                        //   message: `password must be 8-16 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                        // },
                      })}
                    />
                  </ThemeProvider>
                  <Grid item>
                    {errors.currentPassword ? (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                        }}
                      >
                        {errors.currentPassword.message}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                {/* End: current password */}
              </Grid>
            </Box>
            <StyledButton
              variant="secondary"
              sx={{ marginBottom: "16px", marginTop: "16px" }}
            >
              change password
            </StyledButton>
            <StyledButton type="submit" variant="contained" fullWidth>
              save changes
            </StyledButton>
          </Grid>
        </Grid>
        {isError === false ? (
          <InstantMessage variant={"success"} message={messageFromServer} />
        ) : isError === true ? (
          <InstantMessage variant={"error"} message={messageFromServer} />
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
};

export default Profile;

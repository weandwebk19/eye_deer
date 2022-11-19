import { StyledDashboardBigTitleBar } from "components/Navigation/StyledNavigationBar";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";
import { StyledPrimaryButton , StyledSecondaryButton} from "components/Button/StyledButton";
import { CssBaseline, Link, Grid, Box, Container, Avatar, Divider } from "@mui/material";
import InstantMessage from "components/Popup/InstantMessage";
import { ThemeProvider } from "@mui/material/styles";
import {
  StyledInputField,
  customTheme,
} from "components/Textbox/StyledInputField";

import defaultAvatar from "../../assets/imgs/avatar.jpg"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getUserByUsername, updateProfileUser } from "httpClient";

//mock username

const Profile = () => {
    //preview avatar
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [isDeleteAvatar, setIsDeleteAvatar] = useState(false);

    //form
    const [isError, setIsError] = useState("");
    const [messageFromServer, setMessageFromServer] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (userInfo) => {
        userInfo.avatarFile = selectedFile;
        userInfo.isDeleteAvatar = isDeleteAvatar;

        //mock username
        const username = 'xxx';
        
        //call api here
        const res = await updateProfileUser(username, userInfo)
        .catch(err => {
            setMessageFromServer(err.message);
            setIsError(true);
        });

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
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    //get user info
    useEffect(() => {
        //mock username
        const username = 'xxx';
        getUserByUsername(username)
            .then((userInfo) => {
                setPreview(userInfo.picture);
                reset({
                    username: userInfo.username,
                    lastName: userInfo.lastName,
                    firstName: userInfo.firstName,
                    email: userInfo.email,
                });
            })
            .catch((error)=>{
                console.log(error);
            });
    }, [])

    return (
        <>
            <Box sx={{display: {md: 'none'}}}>
                <StyledDashboardBigTitleBar size="sm"/>
            </Box>
            <Box sx={{display: {xs: 'none', md: 'block'}}}>
                <StyledDashboardBigTitleBar size="md"/>
            </Box>
            <Grid container
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    padding: "50px",
                    justifyContent: "center",
                    gap: "50px",
                }}
            >
                <Grid item xs={10} md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <StyledHeadingTypography variant="h4">User Avatar</StyledHeadingTypography>
                    <Avatar src={preview || defaultAvatar} alt="avater" variant="rounded"
                            sx={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                marginTop: "50px"
                            }}
                        />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px"
                        }}
                    >
                        <StyledSecondaryButton onClick={()=>{setSelectedFile(undefined); setIsDeleteAvatar(true);}}>Delete Avatar</StyledSecondaryButton>
                        <StyledPrimaryButton component="label">
                            Change Avatar
                            <input hidden accept="image/*" type="file" onChange={onSelectFile}/>    
                        </StyledPrimaryButton>
                    </Box>
                </Grid>

                <Grid item xs={10} md={6}>
                    <StyledHeadingTypography variant="h4">User Profile</StyledHeadingTypography>
                    <Grid 
                        container 
                        columns={{ xs: 4, sm: 8, md: 8 }} 
                        spacing={3}
                        sx={{
                            marginTop: "50px",
                        }}  
                    >
                        {/* Start: Lastname */}
                        <Grid item xs={8} sm={4} md={4}>
                            <ThemeProvider theme={customTheme}>
                            <StyledInputField
                                variant="light"
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
                                variant="light"
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
                            variant="light"
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
                                variant="light"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                type="email"
                                name="email"
                                autoComplete="email"
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
                            <Divider textAlign="left">Provide password to verify</Divider>
                        </Grid>

                        {/* Start: current password */}
                        <Grid item xs={8} sm={8} md={8}>
                        <ThemeProvider theme={customTheme}>
                            <StyledInputField
                            variant="light"
                            required
                            fullWidth
                            name="currentPassword"
                            label="password"
                            type="password"
                            id="current-password"
                            autoComplete="current-password"
                            {...register("currentPassword", {
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
                        
                        <Grid item xs={8}>
                            <StyledPrimaryButton type="submit" variant="contained" fullWidth>save changes</StyledPrimaryButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {isError === false 
                ? (<InstantMessage variant={"success"} message={messageFromServer} />) 
                : isError === true 
                    ? (<InstantMessage variant={"error"} message={messageFromServer} />) 
                    : ("")}
        </>
    )
}

export default Profile;
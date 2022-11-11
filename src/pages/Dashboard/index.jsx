import { useRef } from "react";
import useSize from "@react-hook/size";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";

import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Button,
  Typography,
} from "@mui/material";

import {
  StyledDashboardNavigationBar,
  StyledDashboardBigTitleBar,
} from "../../components/Navigation/StyledNavigationBar";
import { StyledHeadingTypography } from "../../components/Typography/StyledTypography";
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "../../components/Button/StyledButton";

import DashboardQuizSet from "./DashboardQuizSet";
import DashboardFooter from "./DashboardFooter";

import "./styles.scss";

const Dashboard = () => {
  const target1 = useRef(null);
  const target2 = useRef(null);
  const [width1] = useSize(target1);
  const [width2] = useSize(target2);

  // const user = useSelector((state) => state.auth.login.currentUser);
  // const accessToken = user?.accessToken;
  // const id = user?.user.id;
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  // const handleLogout = () => {
  //   logOut(dispatch, id, navigate, accessToken, axiosJWT);
  // };

  return (
    <Box>
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
      >
        <CssBaseline />
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          height="100vh"
        >
          {/* Start: first */}
          <Grid
            item
            xs={4}
            sm={8}
            md={5}
            lg={5}
            sx={{
              height: "100vh",
              overflowY: "scroll !important",
            }}
            p={3}
            id="dashboard-first-tab"
          >
            <Box>
              <StyledDashboardNavigationBar width1={width1} width2={width2} />
              <StyledDashboardBigTitleBar width1={width1} width2={width2} />
            </Box>
            <Box
              my={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <StyledHeadingTypography variant={"h5"}>
                my class(es).
              </StyledHeadingTypography>
              <StyledPrimaryButton>add new class</StyledPrimaryButton>
            </Box>
            <DashboardFooter width1={width1} width2={width2} />
          </Grid>
          {/* End: first */}

          {/* Start: middle */}
          <Grid
            item
            xs={4}
            sm={8}
            md={3}
            lg={3}
            sx={{
              paddingLeft: "0 !important",
              height: "100vh",
              overflow: "hidden !important",
            }}
            ref={target1}
          >
            <Box
              className="dashboard-deco-middle"
              sx={{ position: "relative" }}
            >
              <StyledHeadingTypography className="dashboard-deco-middle__typography">
                let’s together make learning awesome!
              </StyledHeadingTypography>
            </Box>
          </Grid>
          {/* End: middle */}

          {/* Start: last */}
          <Grid
            item
            xs={4}
            sm={8}
            md={4}
            lg={4}
            sx={{
              height: "100vh",
              overflowY: "scroll !important",
            }}
            p={3}
            id="dashboard-last-tab"
            ref={target2}
          >
            <Box>
              <StyledHeadingTypography variant="h3">
                wellcome!
              </StyledHeadingTypography>
              <StyledHeadingTypography variant="h4" gutterBottom>
                tho le
              </StyledHeadingTypography>
              <Typography>
                join eyedeer. <br />- world’s largest free gamify learning
                platform.
              </Typography>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  mt: 2,
                  mb: 2,
                }}
                src="https://source.unsplash.com/random/?deer,antelope,forest"
              ></Box>
              <Grid
                container
                columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}
                spacing={2}
                mb={2}
              >
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <StyledSecondaryButton sx={{ width: "100%" }}>
                    join with eyedeer code
                  </StyledSecondaryButton>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <StyledPrimaryButton sx={{ width: "100%" }}>
                    quick create eyedeer quizzes
                  </StyledPrimaryButton>
                </Grid>
              </Grid>
              <Typography variant="h6" gutterBottom>
                my eyedeers
              </Typography>
              {Array.apply(null, Array(10)).map((_, i) => {
                return <DashboardQuizSet key={i} />;
              })}
            </Box>
          </Grid>
          {/* End: last */}
        </Grid>
        {/* <Button className="navbar-logout" onClick={handleLogout}>
        Log out
      </Button> */}
      </Container>
    </Box>
  );
};

export default Dashboard;

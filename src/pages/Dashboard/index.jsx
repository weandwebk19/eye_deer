import { useState, useEffect, useRef } from "react";
import useSize from "@react-hook/size";
import { Container, CssBaseline, Box, Grid, Typography } from "@mui/material";
import { StyledDashboardNavigationBar } from "../../components/Navigation/NavBar";
import { StyledHeadingTypography } from "../../components/Typography/StyledTypography";
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "../../components/Button/StyledButton";
import { StyledSearchField } from "../../components/TextField/StyledInputField";
import StyledTabs from "../../components/Tabs/StyledTabs";
import StyledDivider from "../../components/Divider/StyledDivider";
import DashboardClass from "./DashboardClass";
import DashboardQuizSet from "./DashboardQuizSet";
import DashboardFooter from "./DashboardFooter";
import "./styles.scss";
import DashboardTabs from "./DashboardTabs";

const Dashboard = () => {
  const middleTab = useRef(null);
  const lastTab = useRef(null);
  const dashboardNav = useRef(null);
  const dashboardHeader = useRef(null);
  const dashboardEyeDeerTitle = useRef();

  const [middleTabWidth] = useSize(middleTab);
  const [lastTabWidth] = useSize(lastTab);
  const [, dashboardNavHeight] = useSize(dashboardNav);
  const [, dashboardHeaderHeight] = useSize(dashboardHeader);
  const [, typoHeight] = useSize(dashboardEyeDeerTitle);

  useEffect(() => {
    const onChangeTab = () => {};
  });

  return (
    <Box className="dashboard-container">
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
              overflowY: "hidden !important",
            }}
            p={3}
            id="dashboard-first-tab"
          >
            <StyledDivider />
            <Box sx={{ display: "flex", flexFlow: "column", height: "100%" }}>
              <Box ref={dashboardNav}>
                <StyledDashboardNavigationBar
                  width1={middleTabWidth}
                  width2={lastTabWidth}
                />
              </Box>
              <Box>
                <Box my={2} ref={dashboardHeader}>
                  <Box
                    mb={3}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <StyledSearchField />
                    <StyledPrimaryButton className="add-group-button">
                      + new group
                    </StyledPrimaryButton>
                  </Box>
                  <StyledHeadingTypography variant={"h5"}>
                    group.
                  </StyledHeadingTypography>
                </Box>
                <DashboardTabs
                  dashboardNavHeight={dashboardNavHeight}
                  dashboardHeaderHeight={dashboardHeaderHeight}
                />

                {/* <Box
                  pb={2}
                  sx={{
                    display: "block",
                    width: "100%",
                    overflowY: "scroll !important",
                    height: {
                      xs: `calc(100vh - ${
                        dashboardNavHeight + dashboardHeaderHeight + 64 + 24
                      }px)`,
                    },
                  }}
                >
                  <Grid
                    container
                    columns={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                    spacing={2}
                    sx={{ width: "100%" }}
                  >
                    {Array.apply(null, Array(15)).map((_, i) => {
                      return (
                        <Grid item xs={4} sm={4} md={2} lg={2} key={i}>
                          <DashboardClass />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box> */}
              </Box>
              <Box>
                <DashboardFooter
                  width1={middleTabWidth}
                  width2={lastTabWidth}
                />
              </Box>
            </Box>
          </Grid>

          {/* End: first */}

          {/* Start: middle */}
          {/* <Box
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
              },
            }}
          >
            <StyledDivider />
          </Box> */}
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
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
            ref={middleTab}
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
            ref={lastTab}
          >
            <Grid
              container
              columns={{ xs: 4, sm: 8, md: 4 }}
              spacing={2}
              id="dashboard-md-first-tab"
            >
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                id="dashboard-welcome"
                sx={{
                  display: "grid",
                  alignContent: "space-between",
                }}
              >
                <Box>
                  <StyledHeadingTypography variant="h3">
                    welcome!
                  </StyledHeadingTypography>
                  <StyledHeadingTypography variant="h4" gutterBottom>
                    tho le
                  </StyledHeadingTypography>
                  <Typography>
                    join eyedeer. <br />- world’s largest free gamify learning
                    platform.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      component="img"
                      sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        mt: 2,
                        mb: 2,
                        flex: "1",
                      }}
                      src="https://source.unsplash.com/random/?deer,antelope,forest"
                      draggable={false}
                    ></Box>
                  </Box>
                </Box>
                <Box>
                  <Grid
                    container
                    columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}
                    spacing={2}
                    // mb={0}
                  >
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                      <StyledSecondaryButton sx={{ width: "100%" }}>
                        join the game
                      </StyledSecondaryButton>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                      <StyledPrimaryButton sx={{ width: "100%" }}>
                        create quizzes
                      </StyledPrimaryButton>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                sx={{ height: `calc(100% - ${typoHeight}px - 5.60px)` }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  ref={dashboardEyeDeerTitle}
                >
                  my eyedeer(s)
                </Typography>
                <Grid
                  container
                  id="dashboard-quizzes-list"
                  columns={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                  // spacing={2}
                  sx={{ width: "100%" }}
                >
                  {Array.apply(null, Array(10)).map((_, i) => {
                    return (
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        key={i}
                        className="dashboard-quiz"
                      >
                        <DashboardQuizSet />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* End: last */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

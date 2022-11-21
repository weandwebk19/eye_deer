import { useState, useEffect, useRef } from "react";
import useSize from "@react-hook/size";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { getMyGroup } from "../../httpClient";

import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

import { StyledDashboardNavigationBar } from "../../components/Navigation/StyledNavigationBar";
import { StyledHeadingTypography } from "../../components/Typography/StyledTypography";
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledAvatarButton,
} from "../../components/Button/StyledButton";
import { StyledSearchField } from "../../components/Textbox/StyledInputField";
import StyledTabs from "../../components/Tabs/StyledTabs";
import StyledDivider from "../../components/Divider/StyledDivider";

import HomeClass from "./HomeClass";
import HomeQuizSet from "./HomeQuizSet";
import HomeFooter from "./HomeFooter";
import HomeTabs from "./HomeTabs";

import "./styles.scss";

const Dashboard = () => {
  const middleTab = useRef(null);
  const lastTab = useRef(null);
  const dashboardNav = useRef(null);
  const dashboardHeader = useRef(null);
  const dashboardEyeDeerTitle = useRef();
  const [myGroupList, setMyGroupList] = useState([]);
  const [joinedGroupList, setjoinedGroupList] = useState([]);

  const [middleTabWidth] = useSize(middleTab);
  const [lastTabWidth] = useSize(lastTab);
  const [, dashboardNavHeight] = useSize(dashboardNav);
  const [, dashboardHeaderHeight] = useSize(dashboardHeader);
  const [, typoHeight] = useSize(dashboardEyeDeerTitle);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const user = currentUser?.user;
  const fullname = user.firstName + " " + user.lastName;

  // const { isLoading, error, data, isFetching } = getMyGroup();
  useEffect(() => {
    // axios
    //   .get("https://dummyjson.com/products?limit=10")
    //   .then((response) => setMyGroupList(response.data.products));

    (async () => {
      const response = await axios
        .get("https://dummyjson.com/products?limit=10")
        .catch();
      setMyGroupList(response.data.products);
    })();
  }, []);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=3")
      .then((response) => setjoinedGroupList(response.data.products));
  }, []);

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
                <HomeTabs
                  myGroupList={myGroupList}
                  joinedGroupList={joinedGroupList}
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
                <HomeFooter width1={middleTabWidth} width2={lastTabWidth} />
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
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <StyledHeadingTypography variant="h3">
                        welcome!
                      </StyledHeadingTypography>
                      <StyledHeadingTypography variant="h4" gutterBottom>
                        {fullname}
                      </StyledHeadingTypography>
                      <Typography>
                        join eyedeer. <br />- world’s largest free gamify
                        learning platform.
                      </Typography>
                    </Box>
                    <StyledAvatarButton
                      picture={user?.picture}
                      fullname={fullname}
                    ></StyledAvatarButton>
                  </Box>

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
                        <HomeQuizSet />
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

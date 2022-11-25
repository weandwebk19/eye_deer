import { useState, useEffect, useRef } from "react";
import useSize from "@react-hook/size";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { getMyGroup } from "../../httpClient";

import { Container, CssBaseline, Box, Grid } from "@mui/material";

import { HalfSizeNavBar } from "components/Navigation";
import { StyledHeadingTypography } from "../../components/Typography/StyledTypography";

import { StyledSearchField } from "../../components/TextField/StyledInputField";
import StyledTabs from "../../components/Tabs/StyledTabs";
import StyledDivider from "../../components/Divider/StyledDivider";

import HomeFirstSection from "./HomeFirstSection";
import HomeLastSection from "./HomeLastSection";
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

  useEffect(() => {
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
                <HalfSizeNavBar width1={middleTabWidth} width2={lastTabWidth} />
              </Box>
              <HomeFirstSection />
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
            <HomeLastSection fullname={fullname} user={user} />
          </Grid>
          {/* End: last */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

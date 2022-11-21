import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Container, Box, Grid } from "@mui/material";

import { StyledCard, StyledCardContent } from "../Card/StyledCard";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJoinedGroups, getOwnedGroups } from "httpClient";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box py={2}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const StyledTabs = ({
  dashboardNavHeight,
  dashboardHeaderHeight,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [myGroupList, setMyGroupList] = useState();
  const [joinedGroupList, setjoinedGroupList] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    (async() => {
      const ownedGroups = await getOwnedGroups(currentUser, dispatch)
      .catch(err => {
        console.log(err);
      });
      setMyGroupList(ownedGroups);
    })()
  }, []);

  useEffect(() => {
    (async() => {
      const joinedGroups = await getJoinedGroups(currentUser, dispatch)
      .catch(err => {
        console.log(err);
      });
      setjoinedGroupList(joinedGroups);
    })()
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="group tabs">
          <Tab label="my groups" {...a11yProps(0)} />
          <Tab label="joined groups" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className="custom-tab-pannel">
        <Box
          pb={2}
          sx={{
            display: "block",
            width: "100%",
            overflowY: "scroll !important",
            height: {
              xs: `calc(100vh - ${
                dashboardNavHeight + dashboardHeaderHeight + 64 + 48 + 48
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
            {myGroupList?.map((e, i) => {
              return (
                <Grid item xs={4} sm={4} md={2} lg={2} key={i}>
                  <StyledCard variant="brick">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <StyledCardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>{e.amountMember} member(s)</Typography>
                        </Box>
                      </StyledCardContent>
                      <Typography variant="h6" noWrap>
                      {e.name}
                      </Typography>
                    </Box>
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          pb={2}
          sx={{
            display: "block",
            width: "100%",
            overflowY: "scroll !important",
            height: {
              xs: `calc(100vh - ${
                dashboardNavHeight + dashboardHeaderHeight + 64 + 48 + 48
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
            {joinedGroupList?.map((e, i) => {
              return (
                <Grid item xs={4} sm={4} md={2} lg={2} key={i}>
                  <StyledCard variant="brick">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <StyledCardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>{e.amountMember} member(s)</Typography>
                        </Box>
                      </StyledCardContent>
                      <Typography variant="h6" noWrap>
                        {e.name}
                      </Typography>
                    </Box>
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default StyledTabs;

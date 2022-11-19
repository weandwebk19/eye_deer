import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Container, Box, Grid } from "@mui/material";

import { StyledCard, StyledCardContent } from "../Card/StyledCard";

import "./styles.scss";

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
  myGroupList,
  joinedGroupList,
  dashboardNavHeight,
  dashboardHeaderHeight,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            {myGroupList.map((_, i) => {
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
                          <Typography>15 quizz(es)</Typography>
                        </Box>
                      </StyledCardContent>
                      <Typography variant="h6" noWrap>
                        Unnamed chapter Unnamed chapter Unnamed chapter Unnamed
                        chapter Unnamed chapter
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
            {joinedGroupList.map((_, i) => {
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
                          <Typography>15 quizz(es)</Typography>
                        </Box>
                      </StyledCardContent>
                      <Typography variant="h6" noWrap>
                        Unnamed chapter Unnamed chapter Unnamed chapter Unnamed
                        chapter Unnamed chapter
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

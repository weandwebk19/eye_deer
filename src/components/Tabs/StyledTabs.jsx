import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Container, Box, Grid } from "@mui/material";

import {
  StyledCard,
  StyledCardContent,
  StyledCardActionArea,
} from "../Card/StyledCard";

import "./styles.scss";
import { useEffect, useState } from "react";

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

const StyledTabs = ({ tabElements, dashboardNavHeight, dashboardHeaderHeight }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="group tabs">
          {tabElements.map((tab, index) => {
            return (<Tab key={index} label={tab.title} {...a11yProps(index)} />)
          })}
        </Tabs>
      </Box>
      {
        tabElements.map((tab, index) => {
          return (
            <TabPanel key={index} value={value} index={index} className="custom-tab-pannel">
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
            {
            Array.isArray(tab.content) ? tab.content.map((e, i) => {
              return (
                <Grid item xs={4} sm={4} md={2} lg={2} key={i}>
                  <StyledCard variant="brick">
                    <StyledCardActionArea>
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
                    </StyledCardActionArea>
                  </StyledCard>
                </Grid>
              );
            }): null}
          </Grid>
        </Box>
      </TabPanel>
        )
        })
      }
      
      {/* <TabPanel value={value} index={1}>
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
      </TabPanel> */}
    </Box>
  );
};

export default StyledTabs;

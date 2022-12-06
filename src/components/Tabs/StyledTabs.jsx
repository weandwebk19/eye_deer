import { isValidElement, useState } from "react";

import {
  Box,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Tabs as MuiTabs,
  Tab,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";

import {
  StyledCard, // StyledCardContent,
  // StyledCardActionArea,
} from "../Card/StyledCard";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Tabs = ({ tabElements }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs value={value} onChange={handleChange} aria-label="group tabs">
          {tabElements.map((tab, index) => {
            return (
              <Tab key={tab.title} label={tab.title} {...a11yProps(index)} />
            );
          })}
        </MuiTabs>
      </Box>
      {tabElements.map((tab, index) => {
        return (
          <TabPanel
            key={tab.title}
            value={value}
            index={index}
            className="custom-tab-pannel"
          >
            <Box
              pb={2}
              sx={{
                display: "block",
                width: "100%",
              }}
            >
              <Grid
                container
                columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}
                spacing={2}
                sx={{ width: "100%" }}
              >
                {Array.isArray(tab.content)
                  ? tab.content.map((content, i) => {
                      if (isValidElement(content)) {
                        return content;
                      }
                    })
                  : tab.content}
              </Grid>
            </Box>
          </TabPanel>
        );
      })}
    </Box>
  );
};

Tabs.propTypes = {
  tabElements: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
};

export default Tabs;

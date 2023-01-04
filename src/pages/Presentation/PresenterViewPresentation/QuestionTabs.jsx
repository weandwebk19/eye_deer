import * as React from "react";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";

import QuestionContent from "./QuestionContent";

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
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabPanel.defaultProps = {
  children: <>question tabs</>,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const questions = [
  {
    id: 1,
    content: "proffesor, what if æ gets hacked?",
    upvote: 2,
    isAnswered: false,
  },
  {
    id: 2,
    content: "sm's water tastes like water",
    upvote: 2,
    isAnswered: false,
  },
  {
    id: 3,
    content: "kim hyunjin barks jeon heejin awwwwwwwwwwwwww",
    upvote: 56,
    isAnswered: true,
  },
];

const QuestionTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={`questions (${
              questions.filter((question) => question.isAnswered === false)
                .length
            })`}
            {...a11yProps(0)}
          />
          <Tab
            label={`answered (${
              questions.filter((question) => question.isAnswered === true)
                .length
            })`}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack sx={{ overflowY: "scroll !important", height: "520px" }}>
          {questions
            .filter((question) => question.isAnswered === false)
            .map((question) => {
              return (
                <QuestionContent
                  key={question.id}
                  name={question.content}
                  handleClick={() => {
                    console.log("marked as answered");
                  }}
                  actionContent="mark as answered"
                />
              );
            })}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack sx={{ overflowY: "scroll !important" }}>
          {questions
            .filter((question) => question.isAnswered === true)
            .map((question) => {
              return (
                <QuestionContent
                  key={question.id}
                  name={question.content}
                  handleClick={() => {
                    console.log("restore question");
                  }}
                  actionContent="restore question"
                />
              );
            })}
        </Stack>
      </TabPanel>
    </Box>
  );
};

export default QuestionTabs;

import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Stack, Tab, Tabs } from "@mui/material";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";

import QuestionThumb from "./QuestionThumb";

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

const QuestionTabs = ({
  questionList,
  currentQuestion,
  setCurrentQuestion,
  onSwitchTab,
  code,
}) => {
  const params = useParams();
  const presentationId = params.id;
  const slideId = params.slideid;
  const socket = useContext(SocketContext);
  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMarkAsAnsweredClick = (e, questionId) => {
    socket.emit("HOST_MARK_AS_ANSWERED", {
      presentationId,
      slideId,
      questionId,
      code,
      userId: user.id,
    });
  };

  const handleRestoreQuestionClick = (e, questionId) => {
    socket.emit("HOST_RESTORE_QUESTION", {
      presentationId,
      slideId,
      questionId,
      code,
      userId: user.id,
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="question box tabs"
        >
          <Tab
            label={`questions (${
              questionList.filter((question) => question.isAnswered === false)
                .length
            })`}
            {...a11yProps(0)}
            onClick={onSwitchTab}
          />
          <Tab
            label={`answered (${
              questionList.filter((question) => question.isAnswered === true)
                .length
            })`}
            {...a11yProps(1)}
            onClick={onSwitchTab}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack
          spacing={1}
          sx={{ overflowY: "scroll !important", height: "520px" }}
          className="hide-scrollbar"
        >
          {questionList
            .filter((question) => question.isAnswered === false)
            .map((question) => {
              return (
                <QuestionThumb
                  key={question.id}
                  question={question}
                  handleClick={() => {
                    setCurrentQuestion(question);
                  }}
                  actionContent="mark as answered"
                  handleActionClick={(e) => {
                    handleMarkAsAnsweredClick(e, question.id);
                  }}
                  isActive={currentQuestion?.id === question?.id}
                />
              );
            })}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack
          spacing={1}
          sx={{ overflowY: "scroll !important", height: "520px" }}
          className="hide-scrollbar"
        >
          {questionList
            .filter((question) => question.isAnswered === true)
            .map((question) => {
              return (
                <QuestionThumb
                  key={question?.id}
                  question={question}
                  handleClick={() => {
                    setCurrentQuestion(question);
                  }}
                  actionContent="restore question"
                  handleActionClick={(e) => {
                    handleRestoreQuestionClick(e, question.id);
                  }}
                  isActive={currentQuestion?.id === question?.id}
                />
              );
            })}
        </Stack>
      </TabPanel>
    </Box>
  );
};

QuestionTabs.propTypes = {
  questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.object.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
  onSwitchTab: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
};

export default QuestionTabs;

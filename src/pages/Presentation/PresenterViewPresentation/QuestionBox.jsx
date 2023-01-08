import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Grid, Grow, IconButton, Stack } from "@mui/material";

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";

import QuestionContent from "./QuestionContent";
import QuestionTabs from "./QuestionTabs";

const QuestionBox = ({
  chatQuestions,
  setChatQuestions,
  code,
  currentSlideIndex,
}) => {
  const [isAnsweredQuestionState, setIsAnsweredQuestionState] = useState(false);
  const [answeredQuestionList, setAnsweredQuestionList] = useState([]);
  const [yetAnswerQuestionList, setYetAnswerQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();

  useEffect(() => {
    setAnsweredQuestionList(chatQuestions.filter((e) => e.isAnswered === true));
    setYetAnswerQuestionList(
      chatQuestions.filter((e) => e.isAnswered === false)
    );
  }, [chatQuestions]);

  useEffect(() => {
    setCurrentQuestion(yetAnswerQuestionList[0]);
  }, [yetAnswerQuestionList]);

  const handleSwitchTab = () => {
    setIsAnsweredQuestionState(!isAnsweredQuestionState);
    const questionAfterSwitch = !isAnsweredQuestionState
      ? answeredQuestionList[0]
      : yetAnswerQuestionList[0];
    setCurrentQuestion(questionAfterSwitch);
  };

  const handleNextQuestion = () => {
    const yetAnswerQuestionLength = yetAnswerQuestionList.length;
    const currentYetAnswerQuestionIndex =
      yetAnswerQuestionList.indexOf(currentQuestion);

    const answeredQuestionLength = answeredQuestionList.length;
    const currentAnsweredQuestionIndex =
      answeredQuestionList.indexOf(currentQuestion);

    if (
      !isAnsweredQuestionState &&
      currentYetAnswerQuestionIndex < yetAnswerQuestionLength - 1
    ) {
      setCurrentQuestion(
        yetAnswerQuestionList[currentYetAnswerQuestionIndex + 1]
      );
    } else if (
      isAnsweredQuestionState &&
      currentAnsweredQuestionIndex < answeredQuestionLength - 1
    ) {
      setCurrentQuestion(
        answeredQuestionList[currentAnsweredQuestionIndex + 1]
      );
    }
  };

  const handlePrevQuestion = () => {
    const currentYetAnswerQuestionIndex =
      yetAnswerQuestionList.indexOf(currentQuestion);

    const currentAnsweredQuestionIndex =
      answeredQuestionList.indexOf(currentQuestion);

    if (!isAnsweredQuestionState && currentYetAnswerQuestionIndex > 0) {
      setCurrentQuestion(
        yetAnswerQuestionList[currentYetAnswerQuestionIndex - 1]
      );
    } else if (isAnsweredQuestionState && currentAnsweredQuestionIndex > 0) {
      setCurrentQuestion(
        answeredQuestionList[currentAnsweredQuestionIndex - 1]
      );
    }
  };

  return (
    <Box p={4} sx={{ overflowY: "hidden" }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}>
        <Grid item xs={4} sm={2} md={5} lg={3} sx={{ height: "600px" }}>
          <QuestionTabs
            questionList={chatQuestions}
            setQuestionList={setChatQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            onSwitchTab={handleSwitchTab}
            code={code}
          />
        </Grid>
        <Grid
          item
          xs={4}
          sm={2}
          md={7}
          lg={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <IconButton onClick={handlePrevQuestion}>
                <ArrowCircleUpIcon />
              </IconButton>
            </Box>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 1000 }}
            >
              <Box>
                <QuestionContent
                  chatQuestions={chatQuestions}
                  currentQuestion={currentQuestion}
                  currentSlideIndex={currentSlideIndex}
                />
              </Box>
            </Grow>
            <Box>
              <IconButton
                onClick={() => handleNextQuestion(yetAnswerQuestionList)}
              >
                <ArrowCircleDownIcon />
              </IconButton>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

QuestionBox.propTypes = {
  chatQuestions: PropTypes.arrayOf(PropTypes.object),
  setChatQuestions: PropTypes.func,
  code: PropTypes.string,
  currentSlideIndex: PropTypes.number,
};

QuestionBox.defaultProps = {
  chatQuestions: [],
  setChatQuestions: () => {},
  code: "",
  currentSlideIndex: 0,
};

export default QuestionBox;

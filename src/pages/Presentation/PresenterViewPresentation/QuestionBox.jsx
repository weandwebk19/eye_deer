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

const questions = [
  {
    presentationId: 1,
    id: 1,
    userId: "0x1",
    content: "proffesor, what if æ gets hacked?",
    upvote: 2,
    isAnswered: false,
  },
  {
    presentationId: 1,
    id: 2,
    userId: "0x2",
    content: "sm's water tastes like water",
    upvote: 2,
    isAnswered: true,
  },
  {
    id: 3,
    presentationId: 1,
    userId: "0x1",
    content: "kim hyunjin barks jeon heejin awwwwwwwwwwwwww",
    upvote: 56,
    isAnswered: true,
  },
  {
    presentationId: 1,
    id: 4,
    userId: "0x2",
    content: "It's so cute i wanna ride it",
    upvote: 69,
    isAnswered: false,
  },
  {
    presentationId: 1,
    id: 5,
    userId: "0x2",
    content: "Oooooooooooooooo goooood ~~",
    upvote: 6,
    isAnswered: false,
  },
  {
    presentationId: 1,
    id: 6,
    userId: "0x2",
    content: "Hahaha send it",
    upvote: 5645,
    isAnswered: false,
  },
  {
    presentationId: 1,
    id: 7,
    userId: "0x3",
    content: "Have you check out NewJeans new song yet?",
    upvote: 1300,
    isAnswered: false,
  },
];

const QuestionBox = ({ chatQuestions, setChatQuestions, code }) => {
  const [isAnsweredQuestionState, setIsAnsweredQuestionState] = useState(false);
  const [answeredQuestionList, setAnsweredQuestionList] = useState([]);
  const [yetAnswerQuestionList, setYetAnswerQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();

  useEffect(() => {
    setAnsweredQuestionList(chatQuestions.filter((e) => e.isAnswered === 1));
    setYetAnswerQuestionList(chatQuestions.filter((e) => e.isAnswered === 0));
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
};

QuestionBox.defaultProps = {
  chatQuestions: [],
  setChatQuestions: () => {},
  code: "",
};

export default QuestionBox;

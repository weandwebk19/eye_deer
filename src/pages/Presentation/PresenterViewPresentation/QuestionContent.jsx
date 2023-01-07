import { useContext } from "react";

import { Box, Typography } from "@mui/material";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledHeadingTypography } from "components/Typography";

const QuestionContent = ({ chatQuestions, currentQuestion }) => {
  const socket = useContext(SocketContext);

  const handleActionClick = (isAnswered) => {
    if (isAnswered) {
      socket.emit("HOST_RESTORE_QUESTION", {
        questionId: currentQuestion.id,
      });
    } else {
      socket.emit("HOST_MARK_AS_ANSWERED", {
        questionId: currentQuestion.id,
      });
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography>1/1</Typography>
      <Typography>Asked on Slide 1</Typography>
      <StyledHeadingTypography variant="h2">
        {currentQuestion?.content}
      </StyledHeadingTypography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ mr: 0.5 }}>
          {currentQuestion?.upvote}
        </Typography>
        <ThumbUpAltOutlinedIcon fontSize="small" />
      </Box>
      <StyledButton
        onClick={() => handleActionClick(currentQuestion?.isAnswered)}
        variant="secondary"
      >
        {currentQuestion?.isAnswered === 1
          ? "restore question"
          : "mark as answered"}
      </StyledButton>
    </Box>
  );
};

QuestionContent.propTypes = {
  // actionContent: PropTypes.string.isRequired,
  // handleActionClick: PropTypes.func.isRequired,
  chatQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.object.isRequired,
};

export default QuestionContent;

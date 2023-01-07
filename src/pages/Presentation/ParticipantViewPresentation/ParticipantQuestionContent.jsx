import { useState } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import PropTypes from "prop-types";

const ParticipantQuestionContent = ({ question }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;

  const handleUpvoteToggle = (e, userAsked) => {
    const questionClicked = e.target.dataset.buttonkey;

    if (!isUpvoted && userAsked === questionClicked) {
      setIsUpvoted(!isUpvoted);
    } else {
      setIsUpvoted(!isUpvoted);
    }
  };

  return (
    <Box key={question.id}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} py={4}>
        <Box>
          <Typography gutterBottom>{question.content}</Typography>
          {question?.userId === user?.id && (
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 0.5,
                backgroundColor: "#297373",
                color: "#e6e6e6",
                borderRadius: 1,
              }}
            >
              Your question
            </Typography>
          )}
        </Box>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>{question.upvote}</Typography>
          {!isUpvoted ? (
            <Tooltip title="upvote">
              <IconButton
                onClick={(e) => handleUpvoteToggle(e, question?.userId)}
                disabled={question?.userId === user?.id}
              >
                <ThumbUpOffAltIcon data-buttonkey={question?.id} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="unupvote">
              <IconButton
                onClick={(e) => handleUpvoteToggle(e, question?.userId)}
                color="secondary"
                sx={{ backgroundColor: "#297373" }}
              >
                <ThumbUpAltIcon data-buttonkey={question?.id} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>
      <Divider />
    </Box>
  );
};

ParticipantQuestionContent.propTypes = {
  question: PropTypes.object.isRequired,
};

export default ParticipantQuestionContent;

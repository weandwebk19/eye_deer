import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";

const ParticipantQuestionContent = ({ question }) => {
  const params = useParams();
  const presentationId = params.id;

  const socket = useContext(SocketContext);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;

  useEffect(() => {
    setIsUpvoted(question?.upvote.includes(user?.id));
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       socket.on("SERVER_SEND_UPVOTE_QUESTION", (data) => {
  //         console.log(data);
  //       });

  //       socket.on("SERVER_SEND_UNUPVOTE_QUESTION", (data) => {
  //         console.log(data);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, [question]);

  const handleUpvoteToggle = async (e, userAsked, questionId) => {
    if (isUpvoted) {
      socket.emit("PARTICIPANT_SEND_UNUPVOTE", {
        code: 123456,
        presentationId,
        questionId,
        userId: user.id,
      });
      setIsUpvoted(!isUpvoted);
    } else {
      socket.emit("PARTICIPANT_SEND_UPVOTE", {
        code: 123456,
        presentationId,
        questionId,
        userId: user.id,
      });
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
          <Typography sx={{ mr: 1 }}>{question?.upvote.length}</Typography>
          {!isUpvoted ? (
            <Tooltip title="upvote">
              <IconButton
                onClick={(e) =>
                  handleUpvoteToggle(e, question?.userId, question?.id)
                }
                disabled={question?.userId === user?.id}
              >
                <ThumbUpOffAltIcon data-buttonkey={question?.userId} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="unupvote">
              <IconButton
                onClick={(e) =>
                  handleUpvoteToggle(e, question?.userId, question?.id)
                }
                color="secondary"
                sx={{ backgroundColor: "#297373" }}
              >
                <ThumbUpAltIcon data-buttonkey={question?.userId} />
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

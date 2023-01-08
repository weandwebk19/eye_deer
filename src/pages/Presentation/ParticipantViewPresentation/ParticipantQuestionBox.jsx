import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, IconButton, Stack, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { StyledButton } from "components/Button";
import { StyledInputField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography";

import ParticipantQuestionContent from "./ParticipantQuestionContent";

const ParticipantQuestionBox = ({
  chatQuestions,
  code,
  handleChangeChatQuestions,
}) => {
  const params = useParams();
  const socket = useContext(SocketContext);
  const presentationId = params.id;
  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputValue, setInputValue] = useState("");

  const handleSendQuestion = (questionFormData) => {
    socket.emit("PARTICIPANT_SEND_QUESTION", {
      id: uuidv4(),
      userId: user.id,
      presentationId,
      content: questionFormData.question,
      upvote: [],
      isAnswered: false,
      code,
    });
    setInputValue("");
  };

  return (
    <Stack sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
        <StyledHeadingTypography variant="h5">
          questions from participants.
        </StyledHeadingTypography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ maxHeight: "400px", overflowY: "scroll !important", pr: 4 }}>
        {chatQuestions.map((question) => {
          return <ParticipantQuestionContent question={question} code={code} />;
        })}
      </Box>

      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit(handleSendQuestion)}>
          <StyledInputField
            value={inputValue}
            placeholder="ask new question..."
            customvariant="light"
            sx={{ width: "100%", mb: 1 }}
            {...register("question", {
              minLength: 1,
              maxLength: 200,
              onChange: (e) => setInputValue(e.target.value),
            })}
          />
          <StyledButton
            type="submit"
            disabled={inputValue === ""}
            sx={{ width: "100%" }}
          >
            <ContactSupportOutlinedIcon sx={{ mr: 1 }} />
            <Typography>send question</Typography>
          </StyledButton>
        </form>
      </Box>
    </Stack>
  );
};

ParticipantQuestionBox.propTypes = {
  chatQuestions: PropTypes.arrayOf(PropTypes.object),
  code: PropTypes.string,
  handleChangeChatQuestions: PropTypes.func.isRequired,
};

ParticipantQuestionBox.defaultProps = {
  chatQuestions: [],
  code: "",
};

export default ParticipantQuestionBox;

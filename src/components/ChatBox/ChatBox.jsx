import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledInputField } from "components/TextField";

import ChatMsg from "./ChatMsg";
import "./styles.scss";

const ChatBox = ({ chatMessages, setChatMessages, code }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputValue, setInputValue] = useState();
  const messagesEndRef = useRef(null);

  const params = useParams();
  const socket = useContext(SocketContext);
  const presentationId = params.id;
  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, [chatMessages]);

  const handleSendMessage = (messageFormData) => {
    socket.emit("PARTICIPANT_SEND_MESSAGE", {
      user,
      presentationId,
      content: messageFormData.message,
      createdAt: new Date(),
      code,
    });
    setInputValue("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(handleSendMessage)}>
        <Box className="chat-box">
          {chatMessages.map((msg) => {
            const side = msg.user.id === user.id ? "right" : "left";
            return (
              <ChatMsg
                key={`${msg.user.id} ${msg.createdAt}`}
                side={side}
                avatar={msg.user.picture}
                AvatarProps={{
                  name: `${msg.user.firstName ?? ""} ${
                    msg.user.lastName ?? ""
                  }`,
                }}
                messages={[msg.content]}
              />
            );
          })}
          <Box ref={messagesEndRef} />
        </Box>
        <Stack direction="row">
          <StyledInputField
            value={inputValue}
            id="outlined-basic-email"
            placeholder="what's in your mind?..."
            customvariant="light"
            fullWidth
            {...register("message", {
              required: "require",
              minLength: 1,
              onChange: (e) => setInputValue(e.target.value),
            })}
          />
          {errors.name ? (
            <div className="error-message-validate">{errors.name.message}</div>
          ) : null}
          <StyledButton type="submit" sx={{ px: 2 }}>
            <SendIcon />
          </StyledButton>
        </Stack>
      </form>
    </Box>
  );
};

ChatBox.propTypes = {
  chatMessages: PropTypes.arrayOf(PropTypes.object),
  setChatMessages: PropTypes.func,
  code: PropTypes.string,
};

ChatBox.defaultProps = {
  chatMessages: [],
  setChatMessages: () => {},
  code: "",
};

export default ChatBox;

import React from "react";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

import { StyledInputField } from "components/TextField";

import ChatMsg from "./ChatMsg";
import "./styles.scss";

const ChatBox = ({ data }) => (
  <Box p={4}>
    <Box className="chat-box">
      <ChatMsg
        avatar=""
        AvatarProps={{ name: "19120671 - Le Nguyen Nhat Tho" }}
        messages={[
          "Hi Tho Le, How r u today?",
          "Did you train yesterday",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
        ]}
      />
      <ChatMsg
        side="right"
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out",
        ]}
      />
      <ChatMsg
        avatar=""
        AvatarProps={{ name: "191⠿⠿6⠿⠿ - ⠿⠿ Nguyen ⠿⠿⠿ Giang" }}
        messages={["Im good.", "See u later."]}
      />
      <ChatMsg
        side="right"
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out",
        ]}
      />
    </Box>
    <StyledInputField
      sx={{ mt: 2 }}
      id="outlined-basic-email"
      label="Type Something"
      customvariant="light"
      fullWidth
    />
  </Box>
);

ChatBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

ChatBox.defaultProps = {
  data: [],
};

export default ChatBox;

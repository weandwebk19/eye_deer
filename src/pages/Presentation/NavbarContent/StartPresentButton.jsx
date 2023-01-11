import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

import { Box } from "@mui/system";
import { SocketContext } from "context/socket";
import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

import { StyledButton } from "components/Button";
import { InstantMessage } from "components/Popup";

const StartPresentButton = ({ slideStart }) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const { groupId } = useParams();

  const handleStartPresent = (e) => {
    if (slideStart.id) {
      if (groupId) {
        socket.emit("CLIENT_SEND_IS_GROUP_STARTED", groupId);
        socket.on("SERVER_SEND_GROUP_NOT_STARTED", () => {
          navigate(`../${slideStart.id}/presenting`);
        });

        socket.on("SERVER_SEND_GROUP_STARTED", () => {
          setIsError(true);
          setMessage(
            "Group is presentating. You must end that presentation to start."
          );
        });
      } else {
        navigate(`../${slideStart.id}/presenting`);
      }
    }
  };

  return (
    <Box>
      <StyledButton
        sx={{ display: { xs: "none", md: "flex" } }}
        onClick={handleStartPresent}
      >
        <PlayCircleFilledWhiteOutlinedIcon sx={{ mr: 2 }} />
        start present
      </StyledButton>
      <StyledButton
        sx={{ display: { xs: "flex", md: "none", lg: "none" } }}
        onClick={handleStartPresent}
      >
        <PlayCircleFilledWhiteOutlinedIcon />
      </StyledButton>
      {(() => {
        if (isError === false) {
          return <InstantMessage variant="success" message={message} />;
        } else if (isError === true) {
          return <InstantMessage variant="error" message={message} />;
        }
      })()}
    </Box>
  );
};

StartPresentButton.propTypes = {
  slideStart: PropTypes.object.isRequired,
};

export default StartPresentButton;

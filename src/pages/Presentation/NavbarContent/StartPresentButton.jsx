import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

import { Box } from "@mui/system";
import { SocketContext } from "context/socket";
import PresentationService from "services/presentationService";

import { StyledButton } from "components/Button";
import { StyledInputField } from "components/TextField";

const StartPresentButton = () => {
  const params = useParams();
  const navigate = useNavigate();
  const presentationId = params?.id;
  const slideId = params?.slideid;

  const socket = useContext(SocketContext);
  const handleStartPresent = async () => {
    try {
      const res = await PresentationService.getCodePresentation(presentationId);
      console.log("code", res);
      if (res.success === true) {
        socket.emit("HOST_START_PRESENT", {
          code: res.data,
          presentationId,
          slideId,
        });
        navigate("presenting");
      }
    } catch (err) {
      console.log(err);
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
    </Box>
  );
};

export default StartPresentButton;

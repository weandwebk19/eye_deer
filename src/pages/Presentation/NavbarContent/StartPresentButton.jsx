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
    console.log("StartPresent");
    const code = await PresentationService.getCodePresentation(presentationId);
    console.log("code", code);
    socket.emit("HOST_START_PRESENT", { code, presentationId, slideId });
    navigate("presenting");
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

import { useNavigate, useParams } from "react-router-dom";

import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

import { Box } from "@mui/system";
import { SocketContext } from "context/socket";
import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

import { StyledButton } from "components/Button";

const StartPresentButton = ({ slideStart }) => {
  const navigate = useNavigate();

  const handleStartPresent = (e) => {
    if (slideStart.id) {
      navigate(`../${slideStart.id}/presenting`);
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

StartPresentButton.propTypes = {
  slideStart: PropTypes.object,
};

StartPresentButton.defaultProps = {
  slideStart: null,
};

export default StartPresentButton;

import { useState } from "react";

import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Button, Paper, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";

import "./styles.scss";

const PreviewBox = ({ variant, index, iscurrent, handleClick }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <Paper
      onClick={() => {
        if (activeIndex === index) {
          setActiveIndex();
        } else {
          setActiveIndex(index);
        }
      }}
      className={` ${(() => {
        if (activeIndex === index) return "preview-box--active";
        else return "preview-box";
      })()}`}
      sx={{
        background: "none",
        borderRadius: 0,
        mb: 2,
        position: "relative",
        overflow: "visible",
      }}
    >
      <PlayArrowIcon id="preview-box__indicator" />
      <Box
        sx={{
          display: "flex",
          border: "1px solid #555555",
          p: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", mr: 1 }}>
          <StyledButton variant="simple" s>
            <ContentCopyIcon sx={{ height: "14px" }} />
          </StyledButton>
          <StyledButton variant="simple">
            <VisibilityOffOutlinedIcon sx={{ height: "14px" }} />
          </StyledButton>
          <StyledButton variant="simple">
            <RefreshIcon sx={{ height: "14px" }} />
          </StyledButton>
          <StyledButton variant="simple">
            <DeleteOutlineOutlinedIcon sx={{ height: "14px" }} />
          </StyledButton>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography>{index}.</Typography>
          <Paper sx={{ width: "100%", height: "100%" }}>
            <Box component="img" />
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
};

PreviewBox.propTypes = {
  variant: PropTypes.string,
  index: PropTypes.number.isRequired,
  iscurrent: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  // menulist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PreviewBox.defaultProps = {
  variant: "multiple-choice",
};

export { PreviewBox };

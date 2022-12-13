import { useNavigate } from "react-router-dom";

import { Box, Paper, Typography } from "@mui/material";

import BarChartIcon from "@mui/icons-material/BarChart";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import TitleIcon from "@mui/icons-material/Title";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";

import "../styles.scss";

// const slideTypeMapper = (typeid) => {
//   switch (typeid) {
//     case 1:
//       return "multiple-choice";
//     case 2:
//       return "heading";
//     case 3:
//       return "paragraph";
//     default:
//       return "multiple-choice";
//   }
// };

const PresentationPreviewThumb = ({ variant, index }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        background: "none",
        borderRadius: 0,
        mb: 2,
        position: "relative",
        overflow: "visible",
      }}
      onClick={() => {
        navigate(`../${index}/edit`);
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
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {(() => {
              if (variant === "Multiple Choice")
                return (
                  <>
                    <BarChartIcon />
                    <Typography
                      variant="caption"
                      className="presentation-thumb__caption"
                    >
                      multiple choice
                    </Typography>
                  </>
                );
              else if (variant === "Heading")
                return (
                  <>
                    <TitleIcon />
                    <Typography
                      variant="caption"
                      className="presentation-thumb__caption"
                    >
                      {" "}
                      title heading
                    </Typography>
                  </>
                );
              else if (variant === "Paragraph")
                return (
                  <>
                    <FormatAlignLeftIcon />
                    <Typography
                      variant="caption"
                      className="presentation-thumb__caption"
                    >
                      {" "}
                      paragraph
                    </Typography>
                  </>
                );
            })()}
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
};

PresentationPreviewThumb.propTypes = {
  variant: PropTypes.number,
  index: PropTypes.number.isRequired,
  // iscurrent: PropTypes.bool.isRequired,
  // handleClick: PropTypes.func.isRequired,
  // menulist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PresentationPreviewThumb.defaultProps = {
  variant: 1,
};

export { PresentationPreviewThumb };

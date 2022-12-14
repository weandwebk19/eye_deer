import { useNavigate, useParams } from "react-router-dom";

import { Box, Paper, Tooltip, Typography } from "@mui/material";

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
import { FormDialog } from "components/Dialog";

import "../styles.scss";
import DeleteSlideDialog from "./DeleteSlideDialog";

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
// };,

const PresentationPreviewThumb = ({ slide, handleDeleteSlide }) => {
  // const { slideid } = useParams();
  // const currentSlide = slideList.find((o) => o.slideid === Number(slideid));
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
        navigate(`../${slide?.index}/edit`);
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
          <Tooltip title="Duplicate" placement="right">
            <StyledButton variant="simple" s>
              <ContentCopyIcon sx={{ height: "14px" }} />
            </StyledButton>
          </Tooltip>
          <Tooltip title="Hide" placement="right">
            <StyledButton variant="simple">
              <VisibilityOffOutlinedIcon sx={{ height: "14px" }} />
            </StyledButton>
          </Tooltip>
          <Tooltip title="Reset" placement="right">
            <StyledButton variant="simple">
              <RefreshIcon sx={{ height: "14px" }} />
            </StyledButton>
          </Tooltip>
          {(() => {
            const content = (
              <Tooltip title="Delete" placement="right">
                <StyledButton variant="simple">
                  <DeleteOutlineOutlinedIcon sx={{ height: "14px" }} />
                </StyledButton>
              </Tooltip>
            );
            return (
              <FormDialog
                FormDialog
                content={content}
                title={`delete slide ${slide?.index}`}
                variant={null}
              >
                <DeleteSlideDialog
                  handleDeleteSlide={() => handleDeleteSlide(slide)}
                />
              </FormDialog>
            );
          })()}
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography>{slide?.index}.</Typography>
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
              if (slide?.typeId === 1)
                return (
                  <>
                    <BarChartIcon />
                    <Typography
                      variant="caption"
                      className="presentation-thumb__caption"
                    >
                      {slide?.type}
                    </Typography>
                  </>
                );
              else if (slide?.typeId === 2)
                return (
                  <>
                    <TitleIcon />
                    <Typography
                      variant="caption"
                      className="presentation-thumb__caption"
                    >
                      {" "}
                      {slide?.type}
                    </Typography>
                  </>
                );
              else if (slide?.typeId === 3)
                return (
                  <>
                    <FormatAlignLeftIcon />
                    <Typography
                      variant="caption"
                      className="presentation-thumb__caption"
                    >
                      {" "}
                      {slide?.type}
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
  slide: PropTypes.object,
  handleDeleteSlide: PropTypes.func,
  // iscurrent: PropTypes.bool.isRequired,
  // handleClick: PropTypes.func.isRequired,
  // menulist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PresentationPreviewThumb.defaultProps = {
  slide: {},
  handleDeleteSlide: () => {},
};

export { PresentationPreviewThumb };

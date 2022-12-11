import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledHeadingTypography } from "components/Typography";

const ParagraphSlide = ({ question, paragraph }) => {
  return (
    <Box>
      <StyledHeadingTypography>{question}</StyledHeadingTypography>
      <Typography>{paragraph}</Typography>
    </Box>
  );
};

ParagraphSlide.propTypes = {
  question: PropTypes.string,
  paragraph: PropTypes.string,
};

ParagraphSlide.defaultProps = {
  question: "",
  paragraph: "",
};
export default ParagraphSlide;

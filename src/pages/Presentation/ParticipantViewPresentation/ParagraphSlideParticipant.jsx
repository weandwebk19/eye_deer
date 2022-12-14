import { Box, Stack, Typography } from "@mui/material";

import Star1 from "assets/imgs/star-1.svg";
import PropTypes from "prop-types";

import { StyledHeadingTypography } from "components/Typography";

const ParagraphSlideParticipant = ({ question, paragraph }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            alt="star"
            src={Star1}
            sx={{ width: "42px", height: "100%", justifyContent: "center" }}
            draggable={false}
          />
          <StyledHeadingTypography
            sx={{ fontSize: "3rem !important" }}
            gutterBottom
          >
            {question}
          </StyledHeadingTypography>
        </Box>

        <Typography sx={{ fontSize: "1rem !important" }}>
          {paragraph}
        </Typography>
      </Stack>
    </Box>
  );
};

ParagraphSlideParticipant.propTypes = {
  question: PropTypes.string,
  paragraph: PropTypes.string,
};

ParagraphSlideParticipant.defaultProps = {
  question: "",
  paragraph: "",
};
export default ParagraphSlideParticipant;

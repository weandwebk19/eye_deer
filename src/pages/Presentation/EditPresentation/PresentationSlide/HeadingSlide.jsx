import { Box, Stack, Typography } from "@mui/material";

import Star1 from "assets/imgs/star-1.svg";
import PropTypes from "prop-types";

import { StyledHeadingTypography } from "components/Typography";

const HeadingSlide = ({ question, subHeading }) => {
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
        <StyledHeadingTypography sx={{ fontSize: "3rem !important" }}>
          {question}
        </StyledHeadingTypography>
        <Typography sx={{ fontSize: "1rem !important" }}>
          {subHeading}
        </Typography>
      </Stack>
    </Box>
  );
};

HeadingSlide.propTypes = {
  question: PropTypes.string,
  subHeading: PropTypes.string,
};

HeadingSlide.defaultProps = {
  question: "",
  subHeading: "",
};
export default HeadingSlide;

// import "@fontsource/ibarra-real-nova";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

import "./styles.scss";

const StyledHeadingTypography = styled(Typography)(
  () =>
    `
    font-family: 'Ibarra Real Nova', serif;
    font-weight: bold;
`
);

const StyledMediumHeadingTypography = styled(Typography)(
  () =>
    `
    font-family: 'IM Fell English', serif;
    font-size: 4rem !important;
    line-height: 3rem !important;
`
);

const StyledBigHeadingTypography = styled(Typography)(
  () => `
  font-family: 'IM Fell English', serif;
  font-size: 5rem !important;
  // line-height: 5rem !important;
`
);

export {
  StyledHeadingTypography,
  StyledMediumHeadingTypography,
  StyledBigHeadingTypography,
};

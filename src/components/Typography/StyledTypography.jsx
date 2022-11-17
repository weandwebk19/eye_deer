//import "@fontsource/ibarra-real-nova";

import { styled } from "@mui/system";
import { Typography } from "@mui/material";

import "./styles.scss";

export const StyledHeadingTypography = styled(Typography)(
  () =>
    `
    font-family: 'Ibarra Real Nova', serif;
    font-weight: bold;
`
);

export const StyledMediumHeadingTypography = styled(Typography)(
  () =>
    `
    font-family: 'IM Fell English', serif;
    font-size: 4rem !important;
    line-height: 3rem !important;
`
);

export const StyledBigHeadingTypography = styled(Typography)(
  () => `
  font-family: 'IM Fell English', serif;
  font-size: 8rem !important;
  line-height: 7rem !important;
`
);

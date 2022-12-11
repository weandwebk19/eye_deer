// import "@fontsource/ibarra-real-nova";
import { Typography } from "@mui/material";

import { styled } from "@mui/system";

import "./styles.scss";

const StyledHeadingTypography = styled(Typography)(
  ({ theme }) =>
    `
    font-family: 'Ibarra Real Nova', serif !important;
    font-weight: bold !important;
    color: ${theme.palette.secondary.contrastText};
`
);

const StyledMediumHeadingTypography = styled(Typography)(
  ({ theme }) =>
    `
    font-family: 'IM Fell English', serif !important;
    font-size: 4rem !important;
    line-height: 3rem !important;
    color: ${theme.palette.secondary.contrastText};

`
);

const StyledBigHeadingTypography = styled(Typography)(
  ({ theme }) => `
  font-family: 'IM Fell English', serif !important;
  font-size: 5rem !important;
  // line-height: 5rem !important;
  color: ${theme.palette.secondary.contrastText};

`
);

export {
  StyledHeadingTypography,
  StyledMediumHeadingTypography,
  StyledBigHeadingTypography,
};

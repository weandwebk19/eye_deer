//import "@fontsource/ibarra-real-nova";

import { styled } from "@mui/system";
import { Typography } from "@mui/material";

import "./styles.scss";

export const StyleHeadingTypography = styled(Typography)(
  ({ theme }) =>
    `
    font-family: 'Ibarra Real Nova', serif;
    font-weight: bold;
`
);
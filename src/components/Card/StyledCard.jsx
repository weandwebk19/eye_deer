import { styled } from "@mui/system";
import { Card, CardActionArea, CardContent } from "@mui/material";

// import "./style.scss";

const StyledCard = styled(Card)(
  ({ theme }) => `
  width: 180px;
  height: 253px;
  box-shadow: none !important;
  padding: 8px;
  border-radius: 0;
  background: ${theme.palette.primary.main};
  color:  ${theme.palette.secondary.light};
`
);

const StyledCardActionArea = styled(CardActionArea)(
  () => `
  height: 100%;
  `
);

const StyledCardContent = styled(CardContent)(
  () => `
  padding: 0;
`
);

export { StyledCard, StyledCardActionArea, StyledCardContent };

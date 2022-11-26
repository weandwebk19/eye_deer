import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(
  ({ theme }) => `
  box-shadow: none !important;
  padding: 24px;
  border-radius: 0;
  background: ${theme.palette.secondary.light};
`
);

export { StyledPaper };

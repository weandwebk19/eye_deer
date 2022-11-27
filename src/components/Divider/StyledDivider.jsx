import { Divider } from "@mui/material";
import { styled } from "@mui/system";

const StyledDivider = styled(Divider)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
`
);

export { StyledDivider };

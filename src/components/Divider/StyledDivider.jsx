import { styled } from "@mui/system";
import { Divider } from "@mui/material";

// import "./style.scss";

const StyledDivider = styled(Divider)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
`
);

export default StyledDivider;

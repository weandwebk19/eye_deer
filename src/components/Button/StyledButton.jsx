import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledPrimaryButton = styled(Button)(
  ({ theme }) => `
  color: ${theme.palette.primary.contrastText};
  background-color: ${theme.palette.primary.main};
  border-radius: 0;
  border: 3px double ${theme.palette.secondary.dark};
  height: 56px;
  text-transform: lowercase;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
  background-color: ${theme.palette.primary.dark};

  };
`
);

const StyledSecondaryButton = styled(Button)(
  ({ theme }) => `
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
  border-radius: 0;
  border: 3px double ${theme.palette.primary.dark};
  height: 56px;
  text-transform: lowercase;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
  background-color: ${theme.palette.secondary.dark};

  };
`
);

export { StyledPrimaryButton, StyledSecondaryButton };

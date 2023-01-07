import { Snackbar } from "@mui/material";

import { styled } from "@mui/system";

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  background: `${theme.palette.primary.main}`,
  animation: `pulse-black 2s infinite`,
  "@keyframes pulse-black": {
    "0%": {
      transform: "scale(0.95)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.7)",
    },

    "70%": {
      transform: "scale(1)",
      boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)",
    },

    "100%": {
      transform: "scale(0.95)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
    },
  },
}));

export { StyledSnackbar };

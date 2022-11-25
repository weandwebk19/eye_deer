import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledButton = styled(Button)(({ theme, variant = "primary" }) => ({
  borderRadius: 0,
  height: "56px",
  textTransform: "lowercase",
  fontWeight: "bold",
  fontSize: "1rem",

  ...(variant === "primary" && {
    color: `${theme.palette.primary.contrastText}`,
    backgroundColor: `${theme.palette.primary.main}`,
    border: `3px double ${theme.palette.secondary.dark}`,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.dark}`,
    },
  }),
  ...(variant === "secondary" && {
    color: `${theme.palette.secondary.contrastText}`,
    backgroundColor: `${theme.palette.secondary.main}`,
    border: `3px double ${theme.palette.primary.dark}`,
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.dark}`,
    },
  }),
}));

export { StyledButton };

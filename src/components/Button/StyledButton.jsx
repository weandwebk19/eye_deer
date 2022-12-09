import { Button } from "@mui/material";
import { styled } from "@mui/system";

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
  ...(variant === "simple" && {
    minWidth: "32px",
    height: "100%",
    padding: "4px !important",
    fontWeight: "light",
    color: `${theme.palette.secondary.contrastText}`,
    background: "rgba(0,0,0,0)",
    border: `1px solid ${theme.palette.primary.dark}`,
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.main}`,
    },
  }),
}));

export { StyledButton };

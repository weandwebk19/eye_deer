import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledContentBox = styled(Box)(({ theme, variant = "default" }) => ({
  boxShadow: "none !important",
  borderRadius: 0,

  ...(variant === "carpet" && {
    width: "100%",
    // height: "88px",
    // padding: "16px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "brick" && {
    width: "100%",
    // height: "200px",
    // padding: "16px",
    background: `${theme.palette.secondary.light}`,
    color: `${theme.palette.primary.main}`,
  }),
}));

export { StyledContentBox };

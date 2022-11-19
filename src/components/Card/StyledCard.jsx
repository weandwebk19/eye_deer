import { styled } from "@mui/system";
import { Card, CardActionArea, CardContent } from "@mui/material";

// import "./style.scss";

const StyledCard = styled(Card)(({ theme, variant }) => ({
  boxShadow: "none !important",
  borderRadius: 0,

  ...(variant === "default" && {
    height: "253px",
    padding: "8px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "carpet" && {
    width: "100%",
    height: "88px",
    padding: "16px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "brick" && {
    width: "100%",
    height: "200px",
    padding: "16px",
    background: `${theme.palette.secondary.dark}`,
    color: `${theme.palette.primary.main}`,
  }),
}));

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

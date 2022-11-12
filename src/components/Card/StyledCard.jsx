import { styled } from "@mui/system";
import { Card, CardActionArea, CardContent } from "@mui/material";

// import "./style.scss";

const StyledCard = styled(Card)(({ theme, variant }) => ({
  width: "100%",
  boxShadow: "none !important",
  borderRadius: 0,

  ...(variant === "default" && {
    height: "253px",
    padding: "8px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "wide" && {
    height: "88px",
    padding: "16px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
    marginBottom: "12px",
  }),
  ...(variant === "horizon" && {}),
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

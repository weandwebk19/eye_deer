import { styled } from "@mui/system";
import { Card, CardActionArea, CardContent } from "@mui/material";

// import "./style.scss";

const StyledCard = styled(Card)(({ theme, variant }) => ({
  ...(variant === "default" && {
    width: "180px",
    height: "253px",
    boxShadow: "none !important",
    padding: "8px",
    borderRadius: 0,
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "wide" && {
    width: "100%",
    height: "88px",
    boxShadow: "none !important",
    padding: "16px",
    borderRadius: 0,
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
    marginBottom: "16px",
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

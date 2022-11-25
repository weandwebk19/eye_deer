import { styled } from "@mui/system";
import {
  Box,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { StyledHeadingTypography } from "../Typography/StyledTypography";

const StyledCardActionArea = styled(CardActionArea)(
  () => `
  height: 100%;
  `
);

const StyledCard = styled(MuiCard)(({ theme, variant = "default" }) => ({
  boxShadow: "none !important",
  borderRadius: 0,

  ...(variant === "default" && {
    height: "253px",
    //padding: "8px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "carpet" && {
    width: "100%",
    height: "88px",
    //padding: "16px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "brick" && {
    width: "100%",
    height: "200px",
    //padding: "16px",
    background: `${theme.palette.secondary.dark}`,
    color: `${theme.palette.primary.main}`,
  }),
  ...(variant === "card-visit" && {
    width: "100%",
    height: "120px",
    //padding: "16px",
    background: `${theme.palette.secondary.light}`,
    color: `${theme.palette.primary.main}`,
  }),
}));

const SimpleCard = ({ name, className, ...other }) => {
  return (
    <StyledCard className={className}>
      <StyledCardActionArea>
        <CardContent
          sx={{
            padding: "8px !important",
            display: "flex",
            flexDirection: "column",
            height: "100% !important",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <svg viewBox="0 0 198 198" xmlns="http://www.w3.org/2000/svg">
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="8.11"
                  numOctaves="1"
                  stitchTiles="stitch"
                />
              </filter>

              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </Box>

          <StyledHeadingTypography variant="h5" sx={{ lineHeight: 1 }}>
            {name}
          </StyledHeadingTypography>
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

const CarpetCard = ({ name = "", picture = "", contentChips }) => {
  return (
    <StyledCard variant="carpet">
      <StyledCardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100% !important",
            alignContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Box display={"flex"}>
              {Object.keys(contentChips).map((key, index) => {
                return (
                  <Typography
                    key={key}
                    mr={1}
                  >{`${contentChips[key]} ${key}`}</Typography>
                );
              })}
            </Box>
            <MoreVertIcon />
          </Box>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export { StyledCard, SimpleCard, CarpetCard };

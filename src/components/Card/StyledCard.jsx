import {
  Box,
  CardActionArea,
  CardContent,
  Card as MuiCard,
  Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { styled } from "@mui/system";
import PropTypes from "prop-types";

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
    // height: "253px",
    // padding: "8px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "carpet" && {
    width: "100%",
    height: "88px",
    // padding: "16px",
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.light}`,
  }),
  ...(variant === "brick" && {
    width: "100%",
    height: "200px",
    // padding: "16px",
    background: `${theme.palette.secondary.dark}`,
    color: `${theme.palette.primary.main}`,
  }),
  ...(variant === "card-visit" && {
    width: "100%",
    height: "120px",
    // padding: "16px",
    background: `${theme.palette.secondary.light}`,
    color: `${theme.palette.primary.main}`,
    border: `1px solid ${theme.palette.primary.dark}`,
  }),

  ...(variant === "double-border" && {
    width: "100%",
    height: "120px",
    // padding: "16px",
    background: `${theme.palette.secondary.light}`,
    color: `${theme.palette.primary.main}`,
    border: `3px double ${theme.palette.primary.dark}`,
  }),
}));

const SimpleCard = ({ name, className, handleClick }) => {
  return (
    <StyledCard className={className}>
      <StyledCardActionArea onClick={handleClick}>
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

const CarpetCard = ({ name, picture, contentChips }) => {
  return (
    <StyledCard variant="carpet">
      <StyledCardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100% !important",
            alignContent: "space-between",
            backgroundImage: { picture },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Box display="flex">
              {Object.keys(contentChips).map((key) => {
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

const OptionCard = ({ name, picture, handleClick }) => {
  return (
    <StyledCard variant="double-border">
      <StyledCardActionArea onClick={handleClick}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100% !important",
            alignContent: "space-between",
            backgroundImage: { picture },
          }}
        >
          <Typography variant="h6">{name}</Typography>
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

SimpleCard.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

SimpleCard.defaultProps = {
  className: null,
  handleClick: () => {},
};

CarpetCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.number),
};

CarpetCard.defaultProps = {
  picture: null,
  contentChips: null,
};

OptionCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  handleClick: PropTypes.func,
};

OptionCard.defaultProps = {
  picture: "",
  handleClick: () => {},
};

export { StyledCard, StyledCardActionArea, SimpleCard, CarpetCard, OptionCard };

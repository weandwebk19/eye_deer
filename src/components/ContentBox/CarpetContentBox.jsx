import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  CardActionArea,
  CardContent,
  Card as MuiCard,
  Typography,
} from "@mui/material";
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
    height: "253px",
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
  }),
}));

const CarpetContentBox = ({ name, picture, contentChips }) => {
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

CarpetContentBox.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.number),
};

CarpetContentBox.defaultProps = {
  picture: null,
  contentChips: null,
};

export { CarpetContentBox };

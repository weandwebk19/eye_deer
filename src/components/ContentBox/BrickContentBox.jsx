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

import { StyledCard, StyledCardActionArea } from "components/Card";

import { StyledHeadingTypography } from "../Typography/StyledTypography";
import { StyledContentBox } from "./StyledContentBox";

const BrickContentBox = ({ name, picture, contentChips }) => {
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

BrickContentBox.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(
    PropTypes.onOfType(PropTypes.number, PropTypes.string)
  ),
};

BrickContentBox.defaultProps = {
  picture: null,
  contentChips: null,
};

export { BrickContentBox };

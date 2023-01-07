import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import PropTypes from "prop-types";

import { MoreButton } from "components/Button";
import { StyledCardActionArea } from "components/Card";

import { StyledContentBox } from "./StyledContentBox";

const ContentBox = ({
  variant,
  index,
  name,
  picture,
  contentChips,
  handleClick,
  menulist,
}) => {
  return (
    <Box>
      {(() => {
        if (variant === "carpet") {
          return (
            <Tooltip title={name} followCursor>
              <StyledContentBox
                variant="carpet"
                className="presentation-content-box"
              >
                <StyledCardActionArea onClick={handleClick}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100% !important",
                      alignContent: "space-between",
                      background: `linear-gradient(to right, rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 0.0)),
                      url(${picture}) no-repeat fixed center`,
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
                            >{`${key}: ${contentChips[key]}`}</Typography>
                          );
                        })}
                      </Box>
                      {menulist.length != 0 && <MoreButton menulist={menulist} />}
                    </Box>
                    <Typography variant="h5" noWrap>
                      presentation {index + 1}
                    </Typography>
                    <Typography variant="h6" noWrap>
                      {name}
                    </Typography>
                  </CardContent>
                </StyledCardActionArea>
              </StyledContentBox>
            </Tooltip>
          );
        } else if (variant === "brick") {
          return (
            <StyledContentBox className="box-zoom-out" variant="brick">
              <StyledCardActionArea onClick={handleClick}>
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
                    <Box my={2}>
                      <Box display="flex">
                        {Object.keys(contentChips).map((key) => {
                          return (
                            <Typography
                              className="box-zoom-out__content-chips"
                              key={key}
                              mr={1}
                            >{`${key}: ${contentChips[key]} `}</Typography>
                          );
                        })}
                      </Box>
                      {/* <IconButton
                        disableRipple
                        sx={{
                          // width: "16px",
                          // height: "16px",
                          position: "absolute",
                          top: "16px",
                          right: 0,
                        }}
                        aria-label="more"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChange();
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton> */}

                      {menulist.length != 0 && <MoreButton menulist={menulist} />}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      overflow: "hidden",
                      border: "1px solid #e6e6e6",
                    }}
                  >
                    <Box
                      className="box-zoom-out__img"
                      sx={{
                        width: "100%",
                        height: "320px",
                        background: `url(${(() => {
                          if (picture !== null) return picture;
                          return "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg";
                        })()}) no-repeat`,
                        backgroundSize: "cover",
                      }}
                    />
                  </Box>
                  <Box mt={2}>
                    <Box
                      sx={{ display: "flex" }}
                      className="box-zoom-out__main-content"
                    >
                      <AccessTimeIcon sx={{ mr: 1 }} />
                      <Typography variant="h6" noWrap sx={{ mb: 6 }}>
                        Nov 28th, 2022
                      </Typography>
                    </Box>
                    <Typography variant="h5" noWrap gutterBottom>
                      {name} —
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCardActionArea>
            </StyledContentBox>
          );
        }
      })()}
    </Box>
  );
};

ContentBox.propTypes = {
  variant: PropTypes.string,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.number),
  handleClick: PropTypes.func.isRequired,
  menulist: PropTypes.arrayOf(PropTypes.object),
};

ContentBox.defaultProps = {
  variant: "carpet",
  picture:
    "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg",
  contentChips: null,
  menulist: [],
};

export { ContentBox };

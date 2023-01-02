import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BlockIcon from "@mui/icons-material/Block";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";

import { MoreButton } from "components/Button";
import {
  StyledCard, // StyledCardActionArea,
  // StyledCardContent,
} from "components/Card/StyledCard";
import { StyledHeadingTypography } from "components/Typography";

import "./styles.scss";

const VisitCard = ({ variant, user, menulist, handleClick }) => {
  const [memberId, setMemberId] = useState(1);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMemberProfile = (memberid) => {
    navigate(`member-list/${memberid}`);
  };

  return (
    <Box>
      {(() => {
        if (variant === "wide") {
          return (
            <StyledCard variant="card-visit" sx={{ height: "56px" }}>
              <Box sx={{ display: "flex", height: "100% !important" }}>
                <CardActionArea disableRipple onClick={handleClick}>
                  <CardContent sx={{ display: "flex", p: 1 }}>
                    <Avatar
                      src={
                        user.picture ??
                        "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
                      }
                      sx={{ marginRight: "16px" }}
                    />
                    <Box sx={{}}>
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "start", fontWeight: "bold" }}
                      >
                        {`${user.firstName} ${user.lastName}`}
                      </Typography>
                      <Typography variant="caption">{user.email}</Typography>
                      <span>・</span>
                      <Typography variant="caption">{user.username}</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Box>
            </StyledCard>
          );
        } else if (variant === "special") {
          return (
            <StyledCard variant="card-visit" className="owner-visit-card">
              <Box sx={{ display: "flex", height: "100% !important" }}>
                <CardActionArea disableRipple onClick={handleClick}>
                  <CardContent sx={{ display: "flex", height: "100%", p: 0 }}>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                      <Grid
                        item
                        xs={0}
                        sm={4}
                        md={4}
                        sx={{
                          height: "100%",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            border: "16px double #292929",
                            borderRadius: "50%",
                            p: 1,
                            position: "absolute",
                            margin: 0,
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            outline: "80px double #292929",
                            outlineOffset: "24px",
                          }}
                        >
                          <Avatar
                            src={
                              user.picture ??
                              "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
                            }
                            sx={{
                              width: 64,
                              height: 64,
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={8}
                        sx={{
                          p: 2,
                          display: "flex",
                          borderLeft: "1px solid #292929",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          className="responsive-avatar"
                          src={
                            user.picture ??
                            "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
                          }
                          sx={{
                            width: 64,
                            height: 64,
                            mr: 2,
                          }}
                        />
                        <Box>
                          <StyledHeadingTypography
                            variant="h5"
                            sx={{ textAlign: "start", fontWeight: "bold" }}
                          >
                            {`${user.firstName} ${user.lastName}`}
                          </StyledHeadingTypography>
                          <Typography>{user.email}</Typography>
                          <Typography>{user.username}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    {/* <Avatar
                      src={
                        user.picture ??
                        "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
                      }
                      sx={{ marginRight: "16px" }}
                    />
                    <Divider orientation="vertical" flexItem />
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "start", fontWeight: "bold" }}
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    <Typography variant="caption">{user.email}</Typography>
                    <span>・</span>
                    <Typography variant="caption">{user.username}</Typography> */}
                  </CardContent>
                </CardActionArea>
              </Box>
            </StyledCard>
          );
        } else
          return (
            <StyledCard variant="card-visit">
              <Box sx={{ display: "flex", height: "100% !important" }}>
                <CardActionArea
                  disableRipple
                  onClick={() => {
                    handleClick(user.id);
                  }}
                >
                  <CardContent sx={{ display: "flex" }}>
                    <Avatar
                      src={
                        user.picture ??
                        "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
                      }
                      sx={{ width: 64, height: 64, marginRight: "16px" }}
                    />
                    <Box sx={{ textOverflow: "ellipsis" }}>
                      <Typography variant="h6">
                        {`${user.firstName} ${user.lastName}`}
                      </Typography>
                      <Typography>{user.email}</Typography>
                      <Typography>{user.username}</Typography>
                    </Box>
                    {(() => {
                      if (variant === "no-morebutton") {
                        return "";
                      } 
                      else if(menulist.length == 0){
                        return "";
                      } 
                      else
                      {
                        return <MoreButton menulist={menulist} />;
                      }
                    })()}
                  </CardContent>
                </CardActionArea>
              </Box>
            </StyledCard>
          );
      })()}
    </Box>
  );
};

VisitCard.propTypes = {
  variant: PropTypes.string,
  user: PropTypes.object,
  menulist: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func.isRequired,
};

VisitCard.defaultProps = {
  variant: "default",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    picture:
      "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg",
  },
  menulist: [
    {
      id: 1,
      name: "settings",
      onClick: () => {
        console.log("group settings");
      },
    },
  ],
};

export { VisitCard };

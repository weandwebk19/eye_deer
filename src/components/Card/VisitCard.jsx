import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BlockIcon from "@mui/icons-material/Block";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  CardActionArea,
  CardContent,
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

const menulist = [
  {
    id: 1,
    name: "terminate co-ownership",
    onClick: () => {
      console.log("group settings");
    },
  },
];

const VisitCard = ({ variant, user }) => {
  const [memberId, setMemberId] = useState(1);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMemberProfile = (memberid) => {
    navigate(`member-list/${memberid}`);
  };

  return (
    <StyledCard variant="card-visit">
      <Box sx={{ display: "flex", height: "100% !important" }}>
        <CardActionArea
          disableRipple
          onClick={() => {
            navigate(`${memberId}`);
          }}
        >
          <CardContent sx={{ display: "flex" }}>
            <Avatar
              src={user.picture ?? "https://source.unsplash.com/random/?rococo"}
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
              } else return <MoreButton menulist={menulist} />;
            })()}
          </CardContent>
        </CardActionArea>
      </Box>
    </StyledCard>
  );
};

VisitCard.propTypes = {
  variant: PropTypes.string,
  user: PropTypes.object,
};

VisitCard.defaultProps = {
  variant: "default",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    picture: "https://source.unsplash.com/random/?rococo",
  },
};

export { VisitCard };

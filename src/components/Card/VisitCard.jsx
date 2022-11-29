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

const VisitCard = ({ variant }) => {
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
              src="https://source.unsplash.com/random/?rococo"
              sx={{ width: 64, height: 64, marginRight: "16px" }}
            />
            <Box sx={{ textOverflow: "ellipsis" }}>
              <Typography variant="h6">Cam lan suc</Typography>
              <Typography>clsuc@gmail.com</Typography>
              <Typography>clsuc</Typography>
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
};

VisitCard.defaultProps = {
  variant: "default",
};

export { VisitCard };

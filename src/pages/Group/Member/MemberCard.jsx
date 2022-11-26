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
import {
  StyledCard, // StyledCardActionArea,
  // StyledCardContent,
} from "components/Card/StyledCard";

const MemberCard = () => {
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
          </CardContent>
        </CardActionArea>
        <IconButton
          id="co-owner__menuicon"
          disableRipple
          sx={{ width: "64px", height: "64px", padding: "16px" }}
          size="small"
          aria-label="more"
          color="primary"
          aria-controls={open ? "co-owner__menuicon" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="co-owner__menuicon"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "co-owner__menuicon",
          }}
        >
          <MenuItem onClick={handleClose}>
            <BlockIcon sx={{ marginRight: "16px" }} />
            Terminate co-ownership
          </MenuItem>
        </Menu>
      </Box>
    </StyledCard>
  );
};

export default MemberCard;

import { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";

// import { MenuListContext } from "pages/Group/GroupList/GroupTabs";
import PropTypes from "prop-types";

const MoreButton = ({ menulist }) => {
  // const menuList = useContext(MenuListContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = (e) => {
    e.stopPropagation(e);
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="co-owner__menuicon"
        disableRipple
        sx={{
          position: "absolute",
          top: "16px",
          right: 0,
        }}
        size="small"
        aria-label="more"
        color="primary"
        aria-controls={open ? "co-owner__menuicon" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => {
          e.stopPropagation(e);
          setAnchorEl(e.currentTarget);
        }}
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
        {menulist.map((menuitem) => {
          return (
            <MenuItem
              key={menuitem.id}
              onClick={(e) => {
                e.stopPropagation(e);
                menuitem.onClick();
              }}
            >
              {menuitem.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

MoreButton.propTypes = {
  menulist: PropTypes.arrayOf(PropTypes.object),
};

MoreButton.defaultProps = {
  menulist: [],
};

export { MoreButton };

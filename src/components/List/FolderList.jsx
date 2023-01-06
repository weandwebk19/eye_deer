import * as React from "react";

import { List } from "@mui/material";
import Box from "@mui/material/Box";

import PropTypes from "prop-types";

const VirtualizedList = ({ items }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {items.map((item, index) => {
          return item;
        })}
      </List>
    </Box>
  );
};

VirtualizedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default VirtualizedList;

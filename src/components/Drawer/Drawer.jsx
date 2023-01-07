import * as React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";

const StyledDrawer = ({
  anchor,
  buttonContent,
  buttonSize,
  drawerHeight,
  children,
}) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box>
      <StyledButton
        onClick={toggleDrawer(anchor, true)}
        sx={buttonSize === "full" ? { width: "100%" } : {}}
      >
        {buttonContent}
      </StyledButton>
      <Drawer
        sx={{ height: `${drawerHeight}px` }}
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {children}
      </Drawer>
    </Box>
  );
};

StyledDrawer.propTypes = {
  anchor: PropTypes.string,
  buttonContent: PropTypes.string,
  buttonSize: PropTypes.string,
  children: PropTypes.node.isRequired,
  drawerHeight: PropTypes.number,
};

StyledDrawer.defaultProps = {
  anchor: "bottom",
  buttonContent: "",
  buttonSize: "full",
  drawerHeight: 200,
};

export default StyledDrawer;

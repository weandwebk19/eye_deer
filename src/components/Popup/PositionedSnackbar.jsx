import * as React from "react";

import Snackbar from "@mui/material/Snackbar";

import PropTypes from "prop-types";

const PositionedSnackbar = ({ message }) => {
  const [state, setState] = React.useState({
    open: true,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  // const handleClick = (newState) => () => {
  //   setState({ open: true, ...newState });
  // };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={3000}
      open={open}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  );
};

PositionedSnackbar.propTypes = {
  message: PropTypes.string,
};

PositionedSnackbar.defaultProps = {
  message: "",
};

export default PositionedSnackbar;

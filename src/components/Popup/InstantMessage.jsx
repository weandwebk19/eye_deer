import React, { useState } from "react";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import PropTypes from "prop-types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstantMessage = ({ variant, message }) => {
  const [open, setOpen] = useState(true);
  // Leave this true since we are not using a button

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
};

InstantMessage.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
};

InstantMessage.defaultProps = {
  variant: "success",
  message: "",
};

export { InstantMessage };

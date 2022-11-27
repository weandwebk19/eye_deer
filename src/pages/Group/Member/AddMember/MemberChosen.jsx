import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import PropTypes from "prop-types";

const MemberChosen = ({ user, onCancel }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={(e) => {
                setOpen(false);
                onCancel();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {user.username}
        </Alert>
      </Collapse>
    </Box>
  );
};

MemberChosen.propTypes = {
  user: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
};

MemberChosen.defaultProps = {
  onCancel: () => {},
};

export default MemberChosen;

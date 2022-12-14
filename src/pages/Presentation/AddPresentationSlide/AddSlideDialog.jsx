import { useState } from "react";

import { Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

import { styled } from "@mui/system";
import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledHeadingTypography } from "components/Typography";

const StyledDialogContent = styled(DialogContent)(
  ({ theme }) => `
  padding: 16px;
`
);

const AddSlideDialog = ({ content, title, children, variant }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {(() => {
        if (typeof content === "string")
          return (
            <StyledButton variant={variant} onClick={handleOpen}>
              {content}
            </StyledButton>
          );
        return (
          <Box variant={variant} onClick={handleOpen}>
            {content}
          </Box>
        );
      })()}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ px: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <StyledHeadingTypography variant="h5">
              {title}.
            </StyledHeadingTypography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box onClick={handleClose}>{children}</Box>
      </Dialog>
    </div>
  );
};

AddSlideDialog.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

AddSlideDialog.defaultProps = {
  content: "",
  title: "",
  variant: "",
};

export { StyledDialogContent, AddSlideDialog };

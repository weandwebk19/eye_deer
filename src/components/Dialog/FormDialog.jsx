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

const FormDialog = ({
  content,
  title,
  children,
  variant,
  buttonSize,
  dialogSize,
  selfClose,
}) => {
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
            <StyledButton
              variant={variant}
              onClick={handleOpen}
              sx={buttonSize === "full" ? { width: "100%" } : {}}
            >
              {content}
            </StyledButton>
          );
        return (
          <Box variant={variant} onClick={handleOpen}>
            {content}
          </Box>
        );
      })()}

      <Dialog open={open} onClose={handleClose} maxWidth={dialogSize} fullWidth>
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
        {selfClose ? (
          <Box onClick={handleClose}>{children}</Box>
        ) : (
          <Box>{children}</Box>
        )}
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  buttonSize: PropTypes.string,
  dialogSize: PropTypes.string,
  selfClose: PropTypes.bool,
};

FormDialog.defaultProps = {
  content: "",
  title: "",
  variant: "",
  buttonSize: "",
  dialogSize: "md",
  selfClose: false,
};

export { StyledDialogContent, FormDialog };

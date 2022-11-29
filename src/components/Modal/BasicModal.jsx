import { useState } from "react";

import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ content, title, children, variant }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <StyledButton variant={variant} onClick={handleOpen}>
        {content}
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {children}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

BasicModal.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string,
  variant: PropTypes.string,
};

BasicModal.defaultProps = {
  content: "",
  title: "",
  children: "",
  variant: "",
};

export { BasicModal };

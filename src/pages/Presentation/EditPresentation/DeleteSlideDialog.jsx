import { DialogContent, Stack, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";

const DeleteSlideDialog = ({ handleDeleteSlide }) => {
  return (
    <StyledPaper>
      <DialogContent sx={{ p: 1 }}>
        <Stack spacing={2}>
          <Typography>are you sure to delete this slide?</Typography>
          <StyledButton
            variant="primary"
            onClick={(e) => handleDeleteSlide()}
            sx={{ width: "100%" }}
          >
            yes, delete this slide
          </StyledButton>
        </Stack>
      </DialogContent>
    </StyledPaper>
  );
};

DeleteSlideDialog.propTypes = {
  handleDeleteSlide: PropTypes.func.isRequired,
};

export default DeleteSlideDialog;

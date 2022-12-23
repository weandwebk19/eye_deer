import { DialogContent, Stack, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";

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
      {/* {(() => {
        if (isError === false) {
          return (
            <InstantMessage variant="success" message={messageFromServer} />
          );
        } else if (isError === true) {
          return <InstantMessage variant="error" message={messageFromServer} />;
        }
        return "";
      })()} */}
    </StyledPaper>
  );
};

DeleteSlideDialog.propTypes = {
  // slideId: PropTypes.number.isRequired,
  handleDeleteSlide: PropTypes.func.isRequired,
};

export default DeleteSlideDialog;

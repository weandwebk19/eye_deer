import { useEffect, useState } from "react";
import PresentationService from "services/presentationService";
import { DialogActions, DialogContent } from "@mui/material";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import PropTypes from 'prop-types';

const RemovePresentation = (props) => {

  // state of ui after add member
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const {presentationId, handleRemovePresentation} = props;

  const handleClick = async () => {
    try {
      // call api to remove presentation
      const res = await PresentationService.removePresentation(presentationId);

      // handle res
      if (res.success === true) {
        setMessageFromServer(res.message);
        setIsError(false);
        handleRemovePresentation(true);
      } else {
        setMessageFromServer(res.message);
        setIsError(true);
      }
    } catch (err) {
      setMessageFromServer(err.message);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  }, [isError]);

  return (
    <StyledPaper sx={{ top: 0 }}>
      <DialogContent sx={{ p: 1 }}>
        This presentation will be removed, all slides will be removed.
        Are you sure?
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleClick}>remove presentation</StyledButton>
      </DialogActions>
      {(() => {
        if (isError === false) {
          return (
            <InstantMessage variant="success" message={messageFromServer} />
          );
        } else if (isError === true) {
          return (
            <InstantMessage variant="error" message={messageFromServer} />
          );
        }
        return "";
      })()}
    </StyledPaper>
  );
};

RemovePresentation.propTypes = {
  presentationId: PropTypes.number.isRequired,
  handleRemovePresentation: PropTypes.func,
};

RemovePresentation.defaultProps = {
  handleRemovePresentation: ()=>{},
}

export default RemovePresentation;

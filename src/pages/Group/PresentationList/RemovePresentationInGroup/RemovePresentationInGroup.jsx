import { useEffect, useState } from "react";
import PresentationService from "services/presentationService";
import { DialogActions, DialogContent } from "@mui/material";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import PropTypes from 'prop-types';

const RemovePresentationInGroup = (props) => {

  // state of ui after add member
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const handleClick = async () => {
    try {
      // call api to remove presentation
      const {groupId, presentationId, handleRemovePresentationInGroup} = props;
      const res = await PresentationService.removePresentationInGroup(groupId, presentationId);

      // handle res
      if (res.success === true) {
        setMessageFromServer(res.message);
        setIsError(false);
        handleRemovePresentationInGroup(true);
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
        This presentation will be removed from this group.
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

RemovePresentationInGroup.propTypes = {
  groupId: PropTypes.number,
  presentationId: PropTypes.number,
  handleRemovePresentationInGroup: PropTypes.func,
};

RemovePresentationInGroup.defaultProps = {
  groupId: null,
  presentationId: null,
  handleRemovePresentationInGroup: ()=>{},
}

export default RemovePresentationInGroup;

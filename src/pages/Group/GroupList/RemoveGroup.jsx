import { useEffect, useState } from "react";
import PresentationService from "services/presentationService";
import { DialogActions, DialogContent } from "@mui/material";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import PropTypes from 'prop-types';
import GroupService from "services/groupService";

const RemoveGroup = (props) => {
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const {groupId, handleRemoveGroup} = props;

  const handleClick = async () => {
    try {
      // call api to remove group
      const res = await GroupService.removeGroup(groupId);

      // handle res
      if (res.success === true) {
        setMessageFromServer(res.message);
        setIsError(false);
        handleRemoveGroup(true);
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
        Group will be removed.
        Are you sure?
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleClick}>remove group</StyledButton>
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

RemoveGroup.propTypes = {
  groupId: PropTypes.number.isRequired,
  handleRemoveGroup: PropTypes.func,
};

RemoveGroup.defaultProps = {
  handleRemoveGroup: ()=>{},
}

export default RemoveGroup;

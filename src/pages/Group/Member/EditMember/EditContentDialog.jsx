import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Grid, Switch } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Box } from "@mui/system";
import pictureDefault from "assets/imgs/pictureDefault.png";
import PropTypes from "prop-types";
import GroupService from "services/groupService";

import { StyledButton } from "components/Button/StyledButton";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";

const EditContentDialog = ({
  userId,
  index,
  members,
  setMembers,
  setCoOwners,
}) => {
  const currentUser = useSelector((state) => state.auth.user);
  const params = useParams();
  const groupId = params.id;

  /// /form
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const handleKickOut = async (e) => {
    const res = await GroupService.kickOutMember(groupId, userId);

    // handle res
    if (res.success === true) {
      setMembers((prevMembers) => {
        const newMembers = prevMembers.splice(index, 1);
        return newMembers;
      });
      setMessageFromServer(res.message);
      setIsError(false);
    } else {
      setMessageFromServer(res.message);
      setIsError(true);
    }
  };

  const handleAssignCoOwner = async (e) => {
    const res = await GroupService.assignCoOwner(groupId, userId);

    // handle res
    if (res.success === true) {
      setCoOwners((prevCoOwners) => {
        const newCoOwners = prevCoOwners.concat(members[index]);
        return newCoOwners;
      });

      setMembers((prevMembers) => {
        const newMembers = prevMembers.splice(index, 1);
        return newMembers;
      });

      setMessageFromServer(res.message);
      setIsError(false);
    } else {
      setMessageFromServer(res.message);
      setIsError(true);
    }
  };

  return (
    <StyledPaper>
      <DialogContent sx={{ p: 1 }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}>
          <Grid item xs={4} sm={4} md={6} lg={6}>
            <StyledButton
              variant="primary"
              onClick={handleKickOut}
              sx={{ width: "100%" }}
            >
              Kick out
            </StyledButton>
          </Grid>
          <Grid item xs={4} sm={4} md={6} lg={6}>
            <StyledButton
              variant="secondary"
              onClick={handleAssignCoOwner}
              sx={{ width: "100%" }}
            >
              assign co-ownership
            </StyledButton>
          </Grid>
        </Grid>
      </DialogContent>
      {(() => {
        if (isError === false) {
          return (
            <InstantMessage variant="success" message={messageFromServer} />
          );
        } else if (isError === true) {
          return <InstantMessage variant="error" message={messageFromServer} />;
        }
        return "";
      })()}
    </StyledPaper>
  );
};

EditContentDialog.propTypes = {
  userId: PropTypes.string.isRequired,
  index: PropTypes.number,
  members: PropTypes.arrayOf(PropTypes.object),
  setMembers: PropTypes.func,
  setCoOwners: PropTypes.func,
};

EditContentDialog.defaultProps = {
  index: 0,
  members: [],
  setMembers: () => {},
  setCoOwners: () => {},
};

export default EditContentDialog;

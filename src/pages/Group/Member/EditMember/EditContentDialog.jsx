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
import { createGroup } from "httpClient";
import { assignCoOwner, kickOutMember } from "httpClient/privateApis";
import PropTypes from "prop-types";

import { StyledButton } from "components/Button/StyledButton";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";

const EditContentDialog = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const params = useParams();
  const groupId = params.id;

  /// /form
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const handleKickOut = async (e) => {
    const res = await kickOutMember(currentUser, dispatch, groupId, userId);

    // handle res
    if (res.success === true) {
      setMessageFromServer(res.message);
      setIsError(false);
    } else {
      setMessageFromServer(res.message);
      setIsError(true);
    }
  };

  const handleAssignCoOwner = async (e) => {
    const res = await assignCoOwner(currentUser, dispatch, groupId, userId);

    // handle res
    if (res.success === true) {
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
};
export default EditContentDialog;

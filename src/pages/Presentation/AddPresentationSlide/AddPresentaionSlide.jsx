import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Grid, Stack, Switch, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";

import pictureDefault from "assets/imgs/pictureDefault.png";
import { clickSlide } from "redux/actions/presentation";
import GroupService from "services/groupService";

import { StyledButton } from "components/Button/StyledButton";
import { SimpleCard } from "components/Card";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import { StyledInputField } from "components/TextField";

const AddPresentationSlide = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  //
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /// /form
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (groupInfo) => {
    if (selectedFile) {
      groupInfo.picture = selectedFile;
    } else {
      groupInfo.picture = null;
    }

    // call api
    const res = await GroupService.createGroup(groupInfo);

    // handle res
    if (res.success === true) {
      setMessageFromServer(res.message);
      setIsError(false);

      navigate(`/group/${res.groupId}`, {
        state: { groupId: res.groupId },
      });
    } else {
      setMessageFromServer(res.message);
      setIsError(true);
    }
  };

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ p: 1 }}>
          <Typography>question types.</Typography>
          <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 9, lg: 9 }}>
            <Grid item xs={1} sm={3} md={3} lg={3}>
              <SimpleCard name="multiple choice" />
            </Grid>
          </Grid>
          <Typography>contain slides.</Typography>
          <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 9, lg: 9 }}>
            <Grid item xs={1} sm={3} md={3} lg={3}>
              <SimpleCard name="heading" />
            </Grid>
            <Grid item xs={1} sm={3} md={3} lg={3}>
              <SimpleCard name="paragraph" />
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <StyledButton fullWidth type="submit">
            Add
          </StyledButton>
        </DialogActions> */}
      </form>
    </StyledPaper>
  );
};

export default AddPresentationSlide;

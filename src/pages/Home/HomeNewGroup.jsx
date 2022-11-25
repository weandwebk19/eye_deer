import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledButton } from "components/Button/StyledButton";
import { StyledInputField, customTheme } from "components/TextField";
import { Grid, ButtonBase, Switch, Paper } from "@mui/material";
import pictureDefault from "../../assets/imgs/pictureDefault.png";
import { createGroup } from "httpClient";
import { InstantMessage } from "components/Popup";

export default function HomeNewGroup() {
  //
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  //
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  ////form
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  //
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    selectedFile
      ? (groupInfo.picture = selectedFile)
      : (groupInfo.picture = null);

    //call api
    const res = await createGroup(currentUser, dispatch, groupInfo);

    //handle res
    if (res.success === true) {
      setMessageFromServer(res.message);
      setIsError(false);

      alert("redirect with id group: " + res.groupId);
    } else {
      setMessageFromServer(res.message);
      setIsError(true);
    }
  };

  return (
    <div>
      <StyledButton
        variant="secondary"
        className="add-group-button"
        onClick={handleClickOpen}
      >
        + new group
      </StyledButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontSize: "24px" }}>New Group</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} pt={1}>
              <Grid item xs={12} sm={5} justifyContent="center">
                <Grid item xs={12}>
                  <img
                    src={preview || pictureDefault}
                    alt="picture group"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledButton component="label" sx={{ width: "100%" }}>
                    add picture
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={onSelectFile}
                    />
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7} container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <StyledInputField
                    variant="light"
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
                    {...register("name", {
                      required: "require",
                      minLength: 1,
                      maxLength: 20,
                      pattern: {
                        value: /^([A-Za-z0-9 ]{1,15})$/i,
                        message: "1 - 15 characters!",
                      },
                    })}
                  />
                  {errors.name ? (
                    <div className="error-message-validate">
                      {errors.name.message}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledInputField
                    variant="light"
                    fullWidth
                    id="capacity"
                    label="capacity"
                    name="capacity"
                    type="number"
                    autoComplete="capacity"
                    {...register("capacity", {
                      required: "require",
                      min: { value: 2, message: "Minimum is 2!" },
                      max: { value: 100, message: "Maximum is 100!" },
                    })}
                  />
                  {errors.capacity ? (
                    <div className="error-message-validate">
                      {errors.capacity.message}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <StyledInputField
                    variant="light"
                    fullWidth
                    id="description"
                    label="description"
                    name="description"
                    autoComplete="description"
                    multiline
                    rows={5}
                    {...register("description")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ textAlign: "right" }}>
                  Status: off
                  <Switch
                    inputProps={{ "aria-label": "controlled" }}
                    color="primary"
                    defaultChecked
                    {...register("status")}
                  />
                  on
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={{ xs: 1, sm: 5 }} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <StyledButton fullWidth type="submit">
                  Add
                </StyledButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledButton
                  variant="secondary"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </StyledButton>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
        {isError === false ? (
          <InstantMessage variant={"success"} message={messageFromServer} />
        ) : isError === true ? (
          <InstantMessage variant={"error"} message={messageFromServer} />
        ) : (
          ""
        )}
      </Dialog>
    </div>
  );
}

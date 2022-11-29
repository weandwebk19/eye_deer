import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Grid, Switch } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";

import pictureDefault from "assets/imgs/pictureDefault.png";
import { createGroup } from "httpClient";

import { StyledButton } from "components/Button/StyledButton";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import { StyledInputField } from "components/TextField";

const AddNewGroup = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login.currentUser);

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
    const res = await createGroup(currentUser, dispatch, groupInfo);

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
          <Grid container spacing={3} columns={{ xs: 4, sm: 4, md: 6, lg: 8 }}>
            <Grid
              item
              xs={4}
              sm={4}
              md={2}
              lg={4}
              justifyContent="center"
              alignContent="space-between"
            >
              <img
                src={preview || pictureDefault}
                alt="group"
                style={{ width: "100%", height: "auto" }}
              />
              <StyledButton component="label" sx={{ width: "100%" }}>
                browse
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onSelectFile}
                />
              </StyledButton>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4} spacing={3}>
              <Grid
                container
                spacing={2}
                columns={{ xs: 4, sm: 4, md: 6, lg: 8 }}
              >
                <Grid item xs={4} sm={4} md={3} lg={4}>
                  <StyledInputField
                    variant="outlined"
                    customvariant="light"
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
                <Grid item xs={4} sm={4} md={3} lg={4}>
                  <StyledInputField
                    variant="outlined"
                    customvariant="light"
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
                <Grid item xs={4} sm={4} md={6} lg={8}>
                  <StyledInputField
                    variant="outlined"
                    customvariant="light"
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
                <Grid item xs={4} sm={4} md={6} lg={8}>
                  Status: private
                  <Switch
                    inputProps={{ "aria-label": "controlled" }}
                    color="primary"
                    defaultChecked
                    {...register("status")}
                  />
                  public
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <StyledButton fullWidth type="submit">
            Add
          </StyledButton>
        </DialogActions>
      </form>
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

export default AddNewGroup;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  Box,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";

import GroupService from "services/groupService";
import PresentationService from "services/presentationService";
import SlideService from "services/slideService";
import UserService from "services/userService";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import { StyledInputField } from "components/TextField";
import PropTypes from 'prop-types';

const SettingPresentation = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  // state of ui after save setting
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [presentation, setPresentation] = useState(null);
  const [disableSaveButton, setDisableSavaButton] = useState(true);
  const {presentationId, handleSettingPresentation} = props;

  const onSubmit = async (data) => {
    try {
      data = {
        ...data,
        status: +isPublic,  
        presentationId,
      };
      const res = await PresentationService.updatePresentation(data);
      
      // handle res
      if (res.success === true) {
        setMessageFromServer(res.message);
        setIsError(false);

        // update ui
        handleSettingPresentation();
        const newPresentation = {...presentation, name: watch("presentationName"), status: isPublic};
        setPresentation(newPresentation);
        setDisableSavaButton(true);
      } else {
        setMessageFromServer(res.message);
        setIsError(true);
      }
    } catch (err) {
      setMessageFromServer(err.message);
      setIsError(true);
    }
  };

  // get presentation info when setting
  useEffect(() => {
    (async () => {
      const presentation = await PresentationService.findPresentationById(presentationId);
      setPresentation(presentation);

      // update ui
      setIsPublic(presentation.status);
      reset({
        presentationName: presentation.name,
      })
    })()
  }, [])

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  }, [isError]);

  const isDisableSaveButton = (name, newName, status, newStatus) => {
    if(name == newName && status == newStatus){
      return true;
    }

    return false;
  }

  const handleIsPublic = () => {
    // set new public
    setIsPublic(!isPublic);

    // update save button
    const newName = watch('presentationName');
    const disable = isDisableSaveButton(presentation.name, newName, presentation.status, !isPublic);
    setDisableSavaButton(disable);
  }

  const handleInputChange = () => {
    const newName = watch('presentationName');
    const disable = isDisableSaveButton(presentation.name, newName, presentation.status, isPublic);
    setDisableSavaButton(disable);
  }

  return (
    <StyledPaper sx={{ top: 0 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ p: 1 }}>
          <StyledInputField
            variant="outlined"
            customvariant="light"
            fullWidth
            id="presentation-name"
            label="Presentation name"
            name="presentationName"
            autoComplete="presentation-name"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("presentationName", {
              required: "required",
              onChange: handleInputChange
            })}
          />
          {errors.presentationName ? (
            <div className="error-message-validate">{errors.presentationName.message}</div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>visible for</Typography>
              <FormGroup sx={{ ml: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      onClick={handleIsPublic}
                    />
                  }
                  label={isPublic ? "public" : "private"}
                />
              </FormGroup>
            </Box>

            <StyledButton 
              type="submit" 
              disabled={disableSaveButton}
              variant="secondary"
            >
              save change
            </StyledButton>
          </Box>
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
      </form>
    </StyledPaper>
  );
};

SettingPresentation.propTypes = {
  presentationId: PropTypes.number.isRequired,
  handleSettingPresentation: PropTypes.func,
};

SettingPresentation.defaultProps = {
  handleSettingPresentation: ()=>{},
}

export default SettingPresentation;

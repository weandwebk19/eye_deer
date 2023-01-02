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

const AddPresentation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const groupId = params.id;

  // state of ui after add member
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const onSubmit = async (data) => {
    try {
      data.groupId = groupId;
      const res = await PresentationService.createNewPresentation(data);
      // handle res
      if (res.success === true) {
        setMessageFromServer(res.message);
        setIsError(false);
        const newSlideRes = await SlideService.createNewSlide({
          slideName: `Slide 1`,
          presentationId: res.data?.id,
          index: 1,
          typeId: 1,
        });

        if (newSlideRes.success === true) {
          navigate(
            `/presentation/${res.data?.id}/${newSlideRes.data?.id}/edit`
          );
        } else {
          setMessageFromServer(newSlideRes.message);
          setIsError(true);
        }
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
            {...register("presentationName", {
              required: "required",
            })}
          />
          {errors.name ? (
            <div className="error-message-validate">{errors.name.message}</div>
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
                      onClick={() => setIsPublic(!isPublic)}
                    />
                  }
                  label={isPublic ? "public" : "private"}
                />
              </FormGroup>
            </Box>

            <StyledButton type="submit">Create presentation</StyledButton>
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

export default AddPresentation;

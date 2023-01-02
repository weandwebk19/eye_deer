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
  Grid,
  Checkbox,
  Radio,
  RadioGroup
} from "@mui/material";
import { ContentBox } from "components/ContentBox";

import GroupService from "services/groupService";
import PresentationService from "services/presentationService";
import SlideService from "services/slideService";
import UserService from "services/userService";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import { StyledInputField } from "components/TextField";

const AddPresentation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const groupId = params.id;

  // state of ui after add member
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [presentations, setPresentations] = useState([]);
  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [stateCheckbox, setStateCheckbox] = useState([]);

  const handleAddPresentation = async () => {
    try{
    if(!selectedPresentation){return;}

    // call api
    const res = await GroupService.addPresentationToGroup(groupId, selectedPresentation);

    // handle res
    if (res.success === true) {
      setMessageFromServer(res.message);
      setIsError(false);
      navigate(0);
    } else {
      setMessageFromServer(res.message);
      setIsError(true);
    } 
    } catch (err) {
      setMessageFromServer(err.message);
      setIsError(true);
    }
  }

  const handleFindPresentations = async (e) => {
    const namePresentation = e.target.value;
    
    // call api to search
    const presentations = await PresentationService.findPresentationsByName(namePresentation);
    console.log(presentations);

    const newStateCheckbox = new Array(presentations.length).fill(false);
    setStateCheckbox(newStateCheckbox);
    setPresentations(presentations);
  }

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
          <StyledInputField
            variant="outlined"
            customvariant="light"
            fullWidth
            id="presentation-name"
            label="Presentation name"
            name="presentationName"
            autoComplete="presentation-name"
            onChange={handleFindPresentations}
          />
          <Grid 
            container 
            spacing={3}
            p={3}
          >
            {presentations.map((presentation, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  key={presentation.id}
                  container
                >
                  <Grid
                    item
                    xs={11}
                  >
                    <ContentBox
                    name={presentation.name}
                    index={index}
                    contentChips={(({ slides, code }) => ({
                      slides,
                      code,
                    }))(presentation)}
                    handleClick={() => {
                      setSelectedPresentation(presentation.id);

                      const newStateCheckbox = new Array(stateCheckbox.length).fill(false);
                      newStateCheckbox[index] = true;
                      setStateCheckbox(newStateCheckbox);
                    }}
                  />
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{display:"flex", justifyContent: "center", alignItems: "center"}}
                  >
                    {stateCheckbox[index] && <Checkbox disabled checked/>}
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
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

            <StyledButton 
              onClick={handleAddPresentation}
            >
              Add presentation
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
    </StyledPaper>
  );
};

export default AddPresentation;

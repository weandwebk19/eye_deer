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
import SlideService from "services/slideService";

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

  const onSubmit = async () => {
    const slideInfo = { slideName: "", presentationId: 1 };
    const res = await SlideService.createNewSlide(slideInfo);
    console.log(res);
  };

  return (
    <StyledPaper>
      <form onSubmit={onSubmit}>
        <DialogContent sx={{ p: 1 }}>
          <Typography>question types.</Typography>
          <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 9, lg: 9 }}>
            <Grid item xs={1} sm={3} md={3} lg={3}>
              <SimpleCard name="multiple choice" handleClick={onSubmit} />
            </Grid>
          </Grid>
          <Typography>contain slides.</Typography>
          <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 9, lg: 9 }}>
            <Grid item xs={1} sm={3} md={3} lg={3}>
              <SimpleCard name="heading" handleClick={onSubmit} />
            </Grid>
            <Grid item xs={1} sm={3} md={3} lg={3}>
              <SimpleCard name="paragraph" handleClick={onSubmit} />
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

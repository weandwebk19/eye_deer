import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";

import PropTypes from "prop-types";
import SlideService from "services/slideService";

import { OptionCard } from "components/Card";
import { StyledPaper } from "components/Paper";

const AddPresentationSlide = ({
  // slideList,
  handleCreateNewSlide,
  // handleChangeSlideList,
}) => {
  const params = useParams();
  const presentationId = params.id;

  // const handleCreateNewSlide = (typeId) => {
  //   const nextIndex = slideList.length + 1;
  //   const slideInfo = {
  //     slideName: "",
  //     presentationId,
  //     index: nextIndex,
  //     typeId,
  //   };
  //   // const res = await SlideService.createNewSlide(slideInfo);

  //   console.log(1);
  //   slideList.push(slideInfo);
  //   handleChangeSlideList(slideList);
  //   console.log(slideList);
  // };

  // useEffect(() => {
  //   (async () => {
  //     const slideList = await SlideService.getSlidesByPresentationId(
  //       presentationId
  //     );
  //     setCurrentSlideList(slideList);
  //     console.log(1);
  //   })();
  // }, []);

  return (
    <StyledPaper>
      <DialogContent sx={{ p: 1 }}>
        <Typography>question types.</Typography>
        <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 9, lg: 9 }}>
          <Grid item xs={1} sm={3} md={3} lg={3}>
            <OptionCard
              name="multiple choice"
              handleClick={() => handleCreateNewSlide(1)}
            />
          </Grid>
        </Grid>
        <Typography>contain slides.</Typography>
        <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 9, lg: 9 }}>
          <Grid item xs={1} sm={3} md={3} lg={3}>
            <OptionCard
              name="heading"
              handleClick={() => handleCreateNewSlide(2)}
            />
          </Grid>
          <Grid item xs={1} sm={3} md={3} lg={3}>
            <OptionCard
              name="paragraph"
              handleClick={() => handleCreateNewSlide(3)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </StyledPaper>
  );
};

AddPresentationSlide.propTypes = {
  // slideList: PropTypes.arrayOf(PropTypes.object),
  handleCreateNewSlide: PropTypes.func,
  // handleChangeSlideList: PropTypes.func,
};

AddPresentationSlide.defaultProps = {
  // slideList: [{}],
  handleCreateNewSlide: () => {},
  // handleChangeSlideList: () => {},
};

export default AddPresentationSlide;

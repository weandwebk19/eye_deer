import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";

import PropTypes from "prop-types";
import SlideService from "services/slideService";

import { OptionCard } from "components/Card";
import { StyledPaper } from "components/Paper";

const AddPresentationSlide = ({ slideList, handleChangeSlideList }) => {
  const [currentSlideList, setCurrentSlideList] = useState(slideList);
  const params = useParams();
  const presentationId = params.id;

  const handleCreateNewSlide = async (typeId) => {
    const nextIndex = slideList.length + 1;
    const slideInfo = {
      slideName: "",
      presentationId,
      index: nextIndex,
      typeId,
    };
    const res = await SlideService.createNewSlide(slideInfo);

    if (res.success) {
      console.log(1);
      slideList.push(res.data);
      handleChangeSlideList(slideList);
    }
  };

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
      <form>
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
      </form>
    </StyledPaper>
  );
};

AddPresentationSlide.propTypes = {
  slideList: PropTypes.arrayOf(PropTypes.object),
  handleChangeSlideList: PropTypes.func,
};

AddPresentationSlide.defaultProps = {
  slideList: [{}],
  handleChangeSlideList: () => {},
};

export default AddPresentationSlide;

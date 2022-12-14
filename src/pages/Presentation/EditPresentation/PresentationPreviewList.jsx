import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Button } from "@mui/material";

import PropTypes from "prop-types";
import { clickSlide, resetState } from "redux/actions/presentation";
import SlideService from "services/slideService";

import { StyledButton } from "components/Button";
import { FormDialog } from "components/Dialog";

import AddPresentationSlide from "../AddPresentationSlide";
import "../styles.scss";
import { PresentationPreviewThumb } from "./PresentationPreviewThumb";

const PresentationPreviewList = ({
  slideList,
  currentSlide,
  handleChangeSlideList,
  handleChangeCurrentSlide,
}) => {
  const params = useParams();
  const presentationId = params.id;

  const { id, slideid } = useParams();

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {});

  const handleDeleteSlide = (slide) => {
    // console.log("successfully deleting", slideId);
    const index = slideList.indexOf(slide);
    slideList.splice(index, 1);
    handleChangeSlideList(slideList);
  };

  return (
    <>
      <Box
        className="presentation-preview-list__add-button"
        sx={{ position: "sticky", top: 0, zIndex: 1, mb: 2 }}
      >
        <FormDialog content="+ new slide" title="Add slide" variant="primary">
          <AddPresentationSlide
            slideList={slideList}
            handleChangeSlideList={handleChangeSlideList}
          />
        </FormDialog>
      </Box>
      <ol>
        {slideList.map((slide, i) => {
          return (
            <Box
              className={`preview-box ${
                activeIndex === slide?.index && "preview-box--active"
              }`}
              key={slide?.slideId}
              onClick={() => {
                setActiveIndex(slide?.index);
                // dispatch(clickSlide(slide.type));
              }}
            >
              <PresentationPreviewThumb
                slide={slide}
                handleDeleteSlide={handleDeleteSlide}
              />
            </Box>
          );
        })}
      </ol>
    </>
  );
};

PresentationPreviewList.propTypes = {
  slideList: PropTypes.arrayOf(PropTypes.object),
  currentSlide: PropTypes.object,
  handleChangeSlideList: PropTypes.func,
  handleChangeCurrentSlide: PropTypes.func,
};

PresentationPreviewList.defaultProps = {
  slideList: [],
  currentSlide: null,
  handleChangeSlideList: () => {},
  handleChangeCurrentSlide: () => {},
};

export default PresentationPreviewList;

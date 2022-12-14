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
import { AddSlideDialog } from "../AddPresentationSlide/AddSlideDialog";
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

  // useEffect(() => {
  //   handleChangeSlideList(slideList);
  // }, [slideList]);
  // useEffect(() => {
  //   handleChangeCurrentSlide(slideList[0]);
  // });

  const handleCreateNewSlide = (typeId) => {
    const nextIndex = slideList.length + 1;
    let slideInfo = {
      slideName: "",
      presentationId,
      index: nextIndex,
      typeId,
    };

    if (typeId === 2) {
      slideInfo = {
        ...slideInfo,
        type: "Heading",
        content: {
          heading: "your heading",
          subHeading: "your sub heading here",
        },
      };
    } else if (typeId === 3) {
      slideInfo = {
        ...slideInfo,
        type: "Paragraph",
        content: { heading: "your heading", paragraph: "your paragraph here" },
      };
    } else {
      slideInfo = {
        ...slideInfo,
        type: "Multiple Choice",
        content: { question: "your question", options: [] },
      };
    }
    // const res = await SlideService.createNewSlide(slideInfo);

    slideList.push(slideInfo);
    handleChangeSlideList(slideList);
    console.log(slideList);
  };

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
        <AddSlideDialog
          content="+ new slide"
          title="Add slide"
          variant="primary"
        >
          <AddPresentationSlide
            // slideList={slideList}
            handleCreateNewSlide={handleCreateNewSlide}
          />
        </AddSlideDialog>
      </Box>
      <ol>
        {slideList.map((slide, i) => {
          return (
            <Box
              className={`preview-box ${
                currentSlide?.index === slide?.index && "preview-box--active"
              }`}
              key={slide?.slideId}
              onClick={() => {
                handleChangeCurrentSlide(slide);
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

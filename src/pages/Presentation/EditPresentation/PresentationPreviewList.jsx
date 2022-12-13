import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { clickSlide, resetState } from "redux/actions/presentation";
import SlideService from "services/slideService";

import { StyledButton } from "components/Button";
import { FormDialog } from "components/Dialog";

import AddPresentationSlide from "../AddPresentationSlide";
import "../styles.scss";
import { PresentationPreviewThumb } from "./PresentationPreviewThumb";

const mockSlides = [
  {
    id: 1,
    type: 1,
  },
  {
    id: 2,
    type: 2,
  },
  {
    id: 3,
    type: 3,
  },
  {
    id: 4,
    type: 1,
  },
];

const PresentationPreviewList = () => {
  const { id, slideid } = useParams();

  const [activeIndex, setActiveIndex] = useState(Number(slideid));

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (window.performance) {
  //     if (performance.navigation.type === 1) {
  //       dispatch(resetState());
  //     }
  //   }
  // }, []);

  useEffect(() => {
    (async () => {
      const slideList = await SlideService.getSlidesByPresentationId(id);
      console.log(slideList);
    })();
  }, []);

  return (
    <>
      <Box
        className="presentation-preview-list__add-button"
        sx={{ position: "sticky", top: 0, zIndex: 1, mb: 2 }}
      >
        <FormDialog content="+ new slide" title="Add slide" variant="primary">
          <AddPresentationSlide />
        </FormDialog>
      </Box>
      <ol>
        {mockSlides.map((slide, i) => {
          return (
            <Box
              className={`preview-box ${
                activeIndex === slide.id && "preview-box--active"
              }`}
              key={slide.id}
              onClick={() => {
                setActiveIndex(slide.id);
                // dispatch(clickSlide(slide.type));
              }}
            >
              <PresentationPreviewThumb variant={slide.type} index={slide.id} />
            </Box>
          );
        })}
      </ol>
    </>
  );
};

export default PresentationPreviewList;

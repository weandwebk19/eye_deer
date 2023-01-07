import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import PropTypes from "prop-types";
import SlideService from "services/slideService";

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
  const roleType = useSelector((state) => (state.role.roleType));

  const handleCreateNewSlide = async (typeId) => {
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
    const res = await SlideService.createNewSlide(slideInfo);

    const currentSlideList = await SlideService.getSlidesByPresentationId(
      presentationId
    );
    handleChangeSlideList(currentSlideList.data);
  };

  const handleDeleteSlide = async (slideId) => {
    const currentSlide = slideList.find((slide) => slide.id === slideId);
    const index = slideList.indexOf(currentSlide);
    slideList.splice(index, 1);
    handleChangeSlideList(slideList);

    await SlideService.removeSlide(slideId);
  };

  return (
    <>
      <Box
        className="presentation-preview-list__add-button"
        sx={{ position: "sticky", top: 0, zIndex: 1, mb: 2 }}
      >
        {roleType != 3 &&
        (<FormDialog
          content="+ new slide"
          title="Add slide"
          variant="primary"
          selfClose={true}
        >
          <AddPresentationSlide handleCreateNewSlide={handleCreateNewSlide} />
        </FormDialog>)
        }
      </Box>
      <ol>
        {slideList.map((slide, i) => {
          return (
            <Box
              className={`preview-box ${
                currentSlide?.id === slide?.id && "preview-box--active"
              }`}
              key={slide?.id}
              onClick={() => {
                handleChangeCurrentSlide(slide);
              }}
            >
              <PresentationPreviewThumb
                index={i + 1}
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

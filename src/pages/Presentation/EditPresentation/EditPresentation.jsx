import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { FluidLayout } from "layouts";
import SlideService from "services/slideService";

import { CustomizerNavBar } from "components/Navigation";

import EditNamePresentation from "../NavbarContent/EditNamePresentation";
import StartPresentButton from "../NavbarContent/StartPresentButton";
import PresentationCustomizer from "./PresentationCustomizer";
import PresentationPreviewList from "./PresentationPreviewList";

const EditPresentation = () => {
  const params = useParams();
  const presentationId = params.id;
  const slideId = params.slideid;
  const [slideList, setSlideList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();

  useEffect(() => {
    (async () => {
      const res = await SlideService.getSlidesByPresentationId(presentationId);

      if (res.success === true) {
        setSlideList(res.data);
        setCurrentSlide(res.data[0]);
      }
    })();
  }, []);

  const handleChangeSlideList = (slideList) => {
    setSlideList(slideList);
  };

  const handleChangeCurrentSlide = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <>
      <CustomizerNavBar
        left={<EditNamePresentation />}
        right={<StartPresentButton />}
      />
      <FluidLayout>
        <PresentationPreviewList
          slideList={slideList}
          currentSlide={currentSlide}
          handleChangeSlideList={handleChangeSlideList}
          handleChangeCurrentSlide={handleChangeCurrentSlide}
        />
        <Outlet
          context={{
            slideList,
            currentSlide,
            handleChangeSlideList,
            handleChangeCurrentSlide,
          }}
        />
        <PresentationCustomizer
          slideList={slideList}
          currentSlide={currentSlide}
          handleChangeSlideList={handleChangeSlideList}
          handleChangeCurrentSlide={handleChangeCurrentSlide}
        />
      </FluidLayout>
    </>
  );
};

export default EditPresentation;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { FluidLayout } from "layouts";
import SlideService from "services/slideService";

import { CustomizerNavBar } from "components/Navigation";
import { Box } from "@mui/system";

import EditNamePresentation from "../NavbarContent/EditNamePresentation";
import StartPresentButton from "../NavbarContent/StartPresentButton";
import PresentationCustomizer from "./PresentationCustomizer";
import PresentationPreviewList from "./PresentationPreviewList";

const EditPresentation = () => {
  const params = useParams();
  const presentationId = params.id;
  const [slideList, setSlideList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();
  const roleType = useSelector(state => state.role.roleType);

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
    (async () => {
      const res = await SlideService.updateCurrentSlide(slide);

      if (res.success === true) {
        // setSlideList(res.data);
        // setCurrentSlide(res.data);
        // console.log(res.data);
      }
    })();
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
        {roleType != 3
          ?
          <Box sx={{width: "20vw"}}>
            <PresentationCustomizer
              slideList={slideList}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              handleChangeSlideList={handleChangeSlideList}
              handleChangeCurrentSlide={handleChangeCurrentSlide}
            />
          </Box>
          :
          <Box sx={{width: "10vw"}}/>
        }
      </FluidLayout>
    </>
  );
};

export default EditPresentation;

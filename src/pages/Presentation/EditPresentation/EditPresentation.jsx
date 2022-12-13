import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { FluidLayout } from "layouts";
import SlideService from "services/slideService";

import { CustomizerNavBar } from "components/Navigation";

import EditNamePresentation from "../NavbarContent/EditNamePresentation";
import StartPresentButton from "../NavbarContent/StartPresentButton";
import PresentationCustomizer from "./PresentationCustomizer";
import PresentationPreviewList from "./PresentationPreviewList";

// const data1 = [
//   {
//     id: 1,
//     name: "option 1",
//     vote: 15,
//   },
//   {
//     id: 2,
//     name: "option 2",
//     vote: 25,
//   },
//   {
//     id: 3,
//     name: "option 3",
//     vote: 2,
//   },
//   {
//     id: 3,
//     name: "option 4",
//     vote: 10,
//   },
//   {
//     id: 4,
//     name: "option 5",
//     vote: 11,
//   },
//   {
//     id: 5,
//     name: "option 6",
//     vote: 32,
//   },
// ];

// const data2 = [
//   {
//     id: 1,
//     name: "mi xao",
//     vote: 15,
//   },
//   {
//     id: 2,
//     name: "com ga xoi mo",
//     vote: 25,
//   },
//   {
//     id: 3,
//     name: "nhin doi",
//     vote: 2,
//   },
// ];
// const slideList = [
//   {
//     id: 1,
//     typeId: 1,
//     question: "chart here",
//     data: data1,
//   },
//   {
//     id: 2,
//     typeId: 2,
//     question: "heading here",
//   },
//   {
//     id: 3,
//     typeId: 3,
//     question: "paragraph here",
//     paragraph: "lorem ipsum",
//   },
//   {
//     id: 4,
//     typeId: 1,
//     question: "chart here",
//     data: data2,
//   },
// ];

// const currentSlide = slideList[0];

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
          slideList={slideList}
          currentSlide={currentSlide}
          handleChangeSlideList={handleChangeSlideList}
          handleChangeCurrentSlide={handleChangeCurrentSlide}
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

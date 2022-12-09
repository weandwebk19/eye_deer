import { FluidLayout } from "layouts";

import CustomizerBox from "components/CustomizerBox";
import { CustomizerNavBar } from "components/Navigation";

import PreviewPresentationSlide from "./PresentationPreviewList";
import PresentationSlide from "./PresentationSlide";

const Presentation = () => {
  return (
    <>
      <CustomizerNavBar />
      <FluidLayout>
        <PreviewPresentationSlide />
        <PresentationSlide />
        <CustomizerBox />
      </FluidLayout>
    </>
  );
};

export default Presentation;

import { Outlet } from "react-router-dom";

import { FluidLayout } from "layouts";

import { CustomizerNavBar } from "components/Navigation";

import PresentationCustomizer from "./PresentationCustomizer";
import PreviewPresentationSlide from "./PresentationPreviewList";
import PresentationSlide from "./PresentationSlide";

const Presentation = () => {
  return (
    <>
      <CustomizerNavBar name="presentation's name" />
      <FluidLayout>
        <PreviewPresentationSlide />
        <Outlet />
        <PresentationCustomizer />
      </FluidLayout>
    </>
  );
};

export default Presentation;

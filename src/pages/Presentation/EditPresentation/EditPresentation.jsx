import { Outlet } from "react-router-dom";

import { FluidLayout } from "layouts";

import { CustomizerNavBar } from "components/Navigation";

import EditNamePresentation from "../NavbarContent/EditNamePresentation";
import StartPresentButton from "../NavbarContent/StartPresentButton";
import PresentationCustomizer from "./PresentationCustomizer";
import PreviewPresentationSlide from "./PresentationPreviewList";
import PresentationSlide from "./PresentationSlide";

const Presentation = () => {
  return (
    <>
      <CustomizerNavBar
        left={<EditNamePresentation />}
        right={<StartPresentButton />}
      />
      <FluidLayout>
        <PreviewPresentationSlide />
        <Outlet />
        <PresentationCustomizer />
      </FluidLayout>
    </>
  );
};

export default Presentation;

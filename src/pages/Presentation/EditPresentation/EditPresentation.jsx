import { Outlet } from "react-router-dom";

import { FluidLayout } from "layouts";

import { CustomizerNavBar } from "components/Navigation";

<<<<<<< Updated upstream
import PresentationCustomizer from "./PresentationCustomizer";
=======
import EditNamePresentation from "../NavbarContent/EditNamePresentation";
import StartPresentButton from "../NavbarContent/StartPresentButton";
>>>>>>> Stashed changes
import PreviewPresentationSlide from "./PresentationPreviewList";
import PresentationSlide from "./PresentationSlide";

const Presentation = () => {
  return (
    <>
<<<<<<< Updated upstream
      <CustomizerNavBar name="presentation's name" />
=======
      <CustomizerNavBar
        left={<EditNamePresentation />}
        right={<StartPresentButton />}
      />
>>>>>>> Stashed changes
      <FluidLayout>
        <PreviewPresentationSlide />
        <Outlet />
        <PresentationCustomizer />
      </FluidLayout>
    </>
  );
};

export default Presentation;

import { Route, Routes } from "react-router-dom";

import EditPresentation from "./EditPresentation";
import PresentationSlide from "./EditPresentation/PresentationSlide";
import PresenatationParticipantView from "./ParticipantViewPresentation/PresentationParticipantView";
import PresenatationPresenterView from "./PresentationPresenterView";

const Presentation = () => {
  return (
    <Routes>
      <Route path=":id">
        <Route path=":slideid">
          <Route path="" element={<EditPresentation />}>
            <Route path="edit" element={<PresentationSlide />} />
          </Route>
          <Route path="presenting" element={<PresenatationPresenterView />} />
          <Route
            path="participating"
            element={<PresenatationParticipantView />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Presentation;

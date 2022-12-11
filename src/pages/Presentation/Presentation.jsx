import { Route, Routes } from "react-router-dom";

import EditPresentation from "./EditPresentation";
import PresentationSlide from "./EditPresentation/PresentationSlide";
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
        </Route>
      </Route>
    </Routes>
  );
};

export default Presentation;

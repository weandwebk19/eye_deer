import { Route, Routes } from "react-router-dom";

import EditPresentation from "./EditPresentation";

const Presentation = () => {
  return (
    <Routes>
      <Route path="/:id" element={<EditPresentation />} />
    </Routes>
  );
};

export default Presentation;

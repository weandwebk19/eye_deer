import { Route, Routes } from "react-router-dom";

import PresentationMangementDefault from "./PresentationMangementDefault";

const PresentationMangement = () => {
  return (
    <Routes>
      <Route path="/" element={<PresentationMangementDefault />}/>
    </Routes>
  );
};

export default PresentationMangement;

import LoginForm from "./LoginForm";
import {
  Routes,
  Route,
} from "react-router-dom";

import "./styles.scss";

const index = () => {
  return (
      <Routes>
        <Route path="/" index={true} element={<LoginForm />} />
      </Routes>
  );
};

export default index;

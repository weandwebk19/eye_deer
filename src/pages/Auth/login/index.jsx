import LoginForm from "./LoginForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
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

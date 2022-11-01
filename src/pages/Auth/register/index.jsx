import RegisterHome from "./RegisterHome";
import RegisterBirthdayPage from "./RegisterBirthdayPage";
import RegisterForm from "./RegisterForm";
import RegisterUserType from "./RegisterUserType";
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
        <Route path="/" index={true} element={<RegisterHome />} />
        <Route index={false} path="/birthday" element={<RegisterBirthdayPage />}/>
        <Route index={false} path="/user-type" element={<RegisterUserType />} />
        <Route index={false} path="/form" element={<RegisterForm />} />
      </Routes>
  );
};

export default index;

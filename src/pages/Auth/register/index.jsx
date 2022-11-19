import { Routes, Route } from "react-router-dom";
import RegisterHome from "./RegisterHome";
import RegisterBirthdayPage from "./RegisterBirthdayPage";
import RegisterForm from "./RegisterForm";
import RegisterUserType from "./RegisterUserType";
import ConfirmEmail from "./ConfirmEmail";

import "./styles.scss";

const Register = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<RegisterHome />} />
      <Route
        index={false}
        path="/birthday"
        element={<RegisterBirthdayPage />}
      />
      <Route index={false} path="/user-type" element={<RegisterUserType />} />
      <Route index={false} path="/form" element={<RegisterForm />} />
      <Route index={false} path="/confirmation" element={<ConfirmEmail />} />
    </Routes>
  );
};

export default Register;

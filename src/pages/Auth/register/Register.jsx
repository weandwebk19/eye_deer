import { Route, Routes } from "react-router-dom";

// import RegisterUserType from "./RegisterUserType";
import ConfirmEmail from "./ConfirmEmail";
import RegisterBirthdayPage from "./RegisterBirthdayPage";
import RegisterForm from "./RegisterForm";
import RegisterHome from "./RegisterHome";
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
      {/* <Route index={false} path="/user-type" element={<RegisterUserType />} /> */}
      <Route index={false} path="/form" element={<RegisterForm />} />
      <Route index={false} path="/confirmation" element={<ConfirmEmail />} />
    </Routes>
  );
};

export default Register;

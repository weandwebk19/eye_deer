import { Route, Routes } from "react-router-dom";

import EmailInputForm from "./EmailInputForm";
import ResetPasswordForm from "./ResetPasswordForm";
import "./styles.scss";

const ResetPassword = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<EmailInputForm />} />
      <Route path="/:token" element={<ResetPasswordForm />} />
    </Routes>
  );
};

export default ResetPassword;

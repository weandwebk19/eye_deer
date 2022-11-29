import { Route, Routes } from "react-router-dom";

import LoginForm from "./LoginForm";
import "./styles.scss";

const Login = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<LoginForm />} />
    </Routes>
  );
};

export default Login;

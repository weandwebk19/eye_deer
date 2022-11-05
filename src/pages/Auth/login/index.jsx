import { Routes, Route } from "react-router-dom";

import LoginForm from "./LoginForm";
<<<<<<< HEAD
=======
import {
  Routes,
  Route,
} from "react-router-dom";
>>>>>>> master

import "./styles.scss";

const index = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<LoginForm />} />
    </Routes>
  );
};

export default index;

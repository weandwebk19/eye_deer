import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Register from "./pages/Auth/register";
import RegisterHome from "./pages/Auth/register/RegisterHome";
import RegisterBirthdayPage from "./pages/Auth/register/RegisterBirthdayPage";
import RegisterForm from "./pages/Auth/register/RegisterForm";

import Home from "./pages/Home";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register/">
            <Route index={true} element={<RegisterHome />} />
            <Route
              index={false}
              path="birthday"
              element={<RegisterBirthdayPage />}
            />
            <Route index={false} path="form" element={<RegisterForm />} />
          </Route>
        </Routes>
      </Router>
      {/* <Container maxWidth="lg">
        <Register />
      </Container> */}
    </div>
  );
};

export default App;

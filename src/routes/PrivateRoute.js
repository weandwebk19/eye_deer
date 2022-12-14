import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import AuthService from "services/authService";
import UserService from "services/userService";

import { useLoggedIn } from "../hooks";

const PrivateRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    (async () => {
      const res = await UserService.getVerifyStatus();
      setIsVerify(res);
      const LoggedInRes = await AuthService.isLoggedIn();
      setIsLoggedIn(LoggedInRes);
    })();
  }, []);

  // const { isLoading, error, data } = useLoggedIn();
  // if (isLoading) return "Loading...";
  // if (error) return `An error has occurred: ${error.message}`;
  console.log(isLoggedIn);
  if (isLoggedIn === undefined) {
    return children;
  } else if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  } else if (isVerify === false) {
    return <Navigate to="/confirmation/require" />;
  } else {
    return children;
  }
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

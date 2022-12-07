import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import UserService from "services/userService";

import { useLoggedIn } from "../hooks";

const PrivateRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState();

  useEffect(() => {
    (async () => {
      const res = await UserService.getVerifyStatus();
      setIsVerify(res);
    })();
  }, []);

  const { isLoading, error, data } = useLoggedIn();
  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;
  if (data === true) {
    if (isVerify === false) {
      return <Navigate to="/confirmation/require" />;
    }
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

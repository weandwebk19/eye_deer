import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";
import AuthService from "services/authService";
import UserService from "services/userService";

import { useLoggedIn } from "../hooks";

const PrivateRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const user = useSelector((state) => state.auth.user?.user);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      socket.emit("CLIENT_CONECTED", user);
    }

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
  // console.log(isLoggedIn);
  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  } else if (isVerify === false) {
    return <Navigate to="/confirmation/require" />;
  }
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

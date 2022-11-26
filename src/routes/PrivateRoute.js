import { useNavigate } from "react-router-dom";

import { useLoggedIn } from "../hooks";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useLoggedIn();
  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;

  if (data === true) {
    return props.children;
  }

  navigate("/login");
};
export default PrivateRoute;

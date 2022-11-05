import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/apiRequest";
import { createAxios } from "../createInstance";
import { logOutSuccess } from "../redux/authSlice";

import { TextField, Button } from "@mui/material";

import NavigationBar from "../components/Navigation/NavigationBar";

import MyLogo1 from "../assets/imgs/logo.svg";

const Home = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };
  return (
    <>
      <NavigationBar />
      <img src={MyLogo1} alt="eyedeer logo" />
      <TextField id="outlined-basic" label="eyedeer code" variant="outlined" />
      <Button>enter</Button>
      {/* <p>Home</p>
      <Link to="/logout" className="navbar-logout" onClick={handleLogout}>
        {}
        Log out
      </Link> */}
    </>
  );
};

export default Home;

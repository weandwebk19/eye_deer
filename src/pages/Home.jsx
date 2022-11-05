<<<<<<< HEAD
import StyledNavigationBar from "../components/Navigation/NavigationBar";

const Home = () => {
  return <StyledNavigationBar />;
=======
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logOut } from "../redux/apiRequest";
import { createAxios } from "../createInstance";
import { logOutSuccess } from "../redux/authSlice";

const Home = () => {
  const user = useSelector((state)=> state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user,dispatch,logOutSuccess);

  const handleLogout = () =>{
    logOut(dispatch,id,navigate, accessToken,axiosJWT);
  }
  return (
    <>
      <p>Home</p>
      <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
    </>
  )
>>>>>>> master
};

export default Home;

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";

import { Box } from "@mui/material";

import StyledNavigationBar from "../../components/Navigation/StyledNavigationBar";
import StyledPrimaryButton from "../../components/Button/StyledPrimaryButton";
import { StyledInputField } from "../../components/Textbox/StyledInputField";

import MyLogo1 from "../../assets/imgs/logo.svg";
import MyDeco2Lines from "../../assets/imgs/deco-2lines.svg";
import "./styles.scss";

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
      <StyledNavigationBar />
      <Box
        sx={{
          width: "300px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <img src={MyLogo1} alt="eyedeer logo" draggable="false" />
        <StyledInputField
          sx={{
            width: "200px",
            mt: 4,
            fontWeight: "bold",
          }}
          id="outlined-basic"
          label="eyedeer code"
          variant="outlined"
        />
        <StyledPrimaryButton sx={{ width: "200px", mt: 2 }}>
          enter
        </StyledPrimaryButton>
        <img
          src={MyDeco2Lines}
          className="deco-img-1"
          draggable={false}
          alt="deco lines"
        />
      </Box>
      {/* <p>Home</p>
      <Link to="/logout" className="navbar-logout" onClick={handleLogout}>
        {}
        Log out
      </Link> */}
    </>
  );
};

export default Home;

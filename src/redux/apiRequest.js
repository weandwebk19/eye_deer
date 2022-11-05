import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await
      axios
      .post(
        `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/auth/login`,
        user
      )
    if(res.status === 200) {
      dispatch(loginSuccess(res.data));
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return true;
    }
    else {
      dispatch(loginFailed());
      return false;
    }
  } catch (err) {
    dispatch(loginFailed());
  }
  return false;
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios
    .post(
      `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/auth/register`,
      user
    );
    if (res.status === 201) {
      dispatch(registerSuccess());
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    return res.data;
  } catch (err) {
    dispatch(registerFailed());
    return null;
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post(
      `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}/auth/logout`,
      id,
      {
        headers: { token: `Bearer ${accessToken}` },
      });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};
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

const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVERBASEURL}${process.env.REACT_APP_SERVERPORT}`
})

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  const res = await instance.post('auth/login', user)
  .catch (err => {
    console.log(err);
    dispatch(loginFailed());
    return false;
  });
  if(res.status === 200) {
    dispatch(loginSuccess(res.data));
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
    return true;
  }
  else {
    console.log(res);
    dispatch(loginFailed());
    return false;
  }
}

export const oAuthLogin = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  const res = await instance.post('auth/oauth/login', user)
  .catch(err => {
    if(err.response.status === 403) {
      dispatch(loginSuccess(user));
      navigate("/register");
    }
    else {
      dispatch(loginFailed());
    }
    return;
  })
  dispatch(loginSuccess(res.data));
  navigate("/");
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  const res = instance.post('/auth/register', user)
  .catch (err=> {
    console.log(err);
    dispatch(registerFailed());
    return null;
  })
  if (res.status === 201) {
    dispatch(registerSuccess());
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  return res.data;
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
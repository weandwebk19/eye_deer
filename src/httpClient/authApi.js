import {
  logOutFailed,
  logOutStart,
  logOutSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../redux/authSlice";
import { createAxios, createAxiosJWT } from "./createInstance";

const axios = createAxios();

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  const res = await axios.post("auth/login", user).catch((err) => {
    dispatch(loginFailed());
    if (err.response !== undefined) {
      return {
        success: false,
        message: err.response.data.message,
      };
    }
    return {
      success: false,
      message: err.message,
    };
  });
  if (res.status === 200) {
    dispatch(loginSuccess(res.data));
    setTimeout(() => {
      navigate("/home");
    }, 2000);
    return {
      success: true,
      message: "successfully login! 🤗",
    };
  } else {
    dispatch(loginFailed());
    return {
      success: false,
      // message: "oops! something went wrong! 😅"
      message: res.message,
    };
  }
};

export const oAuthLoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/oauth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/home");
  } catch (err) {
    if (err.response.status === 403) {
      dispatch(loginSuccess(user));
      navigate("/register");
    } else {
      dispatch(loginFailed());
    }
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("/auth/register", user);
    if (res.status === 201) {
      dispatch(registerSuccess());
      loginUser(user, dispatch, navigate);
    }
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(registerFailed());
    return err.response.data;
  }
};

export const logoutUser = async (user, dispatch, navigate) => {
  const axiosJWT = createAxiosJWT(user, dispatch, logOutSuccess);
  const accessToken = user?.accessToken;
  const id = user?.user.id;

  dispatch(logOutStart());
  try {
    await axiosJWT.post("auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export const requireLogin = async (user, navigate, dispatch) => {
  const axiosJWT = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;
  const id = user?.user.id;

  try {
    const res = await axiosJWT.post("auth", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.status !== 200) {
      navigate("/login");
    }
  } catch (err) {
    navigate("/login");
  }
};

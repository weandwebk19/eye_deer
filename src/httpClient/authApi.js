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
} from "../redux/authSlice";
import {createAxios, createAxiosJWT} from './createInstance';

const axios = createAxios();

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  const res = await axios.post("auth/login", user).catch((err) => {
    console.log(err);
    dispatch(loginFailed());
    return false;
  });
  if (res.status === 200) {
    dispatch(loginSuccess(res.data));
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
    return true;
  } else {
    console.log(res);
    dispatch(loginFailed());
    return false;
  }
};

export const oAuthLoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/oauth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/dashboard");
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

export const requireLogin = async (user, navigate) => {
  const axiosJWT = createAxiosJWT(user);
  const accessToken = user?.accessToken;
  const id = user?.user.id;

  try {
  const res = await axiosJWT.post(
      "auth",
      id,
      {
          headers: { token: `Bearer ${accessToken}` },
      });
      if(res.status !== 200) {
          navigate('/login');
      };
  } catch (err) {
      navigate('/login');
  }
}

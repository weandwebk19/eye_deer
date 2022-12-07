import axios from "axios";

import config from "../config";

const getRefreshToken = async () => {
  try {
    const instance = axios.create({
      withCredentials: true,
      baseURL: `${config.SERVER_URL}`,
    });
    const res = await instance.post("/auth/refresh");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user = { ...user, accessToken: token };
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;

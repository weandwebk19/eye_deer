import axios from "axios";
import jwt_decode from "jwt-decode";
import config from "../config";

const refreshToken = async () => {
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

export const createAxiosJWT = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create({
    withCredentials: true,
    baseURL: `${config.SERVER_URL}`,
  });
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        // if (dispatch && stateSuccess) {
        //   dispatch(stateSuccess(refreshUser));
        // }
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

export const createAxios = () => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: `${config.SERVER_URL}`,
  });
  return instance;
}

export const createAxiosDefault = () => {
  const instance = axios.create({
    baseURL: `${config.SERVER_URL}`
  });
  return instance;
}


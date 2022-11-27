import { loginSuccess } from "redux/authSlice";

import { createAxiosJWT } from "../createInstance";

// get search users
export const getSearchUsers = async (user, dispatch, term) => {
  try {
    const axios = createAxiosJWT(user, dispatch, loginSuccess);
    const accessToken = user?.accessToken;

    const res = await axios.get(`/users/search/items?term=${term}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.status === 200) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.log(error);
    return error;
  }
};

// get user info
export const getUserByUsername = async (user, dispatch) => {
  try {
    const axios = createAxiosJWT(user, dispatch, loginSuccess);
    const accessToken = user?.accessToken;
    const username = user?.user.username;

    const res = await axios.get(`/users/profile/${username}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.status === 200) {
      return res.data;
    }

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// update profile user
export const updateProfileUser = async (user, userInfo, dispatch) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;
  const username = user?.user.username;
  try {
    const formData = new FormData();

    // append data
    for (const key in userInfo) {
      formData.append(key, userInfo[key]);
    }

    const res = await axios({
      method: "post",
      url: `/users/profile/${username}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
    return res;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

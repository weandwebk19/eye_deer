import { loginSuccess } from "redux/authSlice";

import { createAxiosJWT } from "../createInstance";

// get list owned group
export const getOwnedGroups = async (user, dispatch) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;
  const id = user?.user.id;

  const res = await axios
    .get(`users/${id}/groups/owned`, {
      headers: { token: `Bearer ${accessToken}` },
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  if (res.status === 200) {
    return res.data;
  }

  return [];
};

// get list joined group
export const getJoinedGroups = async (user, dispatch) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;
  const id = user?.user.id;

  const res = await axios
    .get(`users/${id}/groups/joined`, {
      headers: { token: `Bearer ${accessToken}` },
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  if (res.status === 200) {
    return res.data;
  }

  return [];
};

export const createGroup = async (user, dispatch, groupInfo) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;
  const userId = user?.user.id;
  try {
    const formData = new FormData();

    // append data
    for (const key in groupInfo) {
      formData.append(key, groupInfo[key]);
    }

    // append user id
    formData.append("userId", userId);

    const res = await axios({
      method: "post",
      url: `/groups/create`,
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

// Make user join a group
export const joinTheGroup = async (user, dispatch, groupId) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;

  const res = await axios
    .post(`groups/${groupId}/join`, groupId, {
      headers: { token: `Bearer ${accessToken}` },
    })
    .catch((error) => {
      console.log(error);
      return error.message;
    });

  return res.data;
};

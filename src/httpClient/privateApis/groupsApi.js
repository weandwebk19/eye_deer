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

  try {
    const res = await axios.post(`groups/${groupId}/join`, groupId, {
      headers: { token: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (err) {
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
  }
};

// get lits members of group
export const getLitsMembers = async (user, dispatch, groupId) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;

  const res = await axios
    .get(`groups/${groupId}/members`, {
      headers: { token: `Bearer ${accessToken}` },
    })
    .catch((error) => {
      console.log(error);
      return error.message;
    });

  if (res.status === 200) {
    return res.data.data;
  } else {
    return [];
  }
};

// invite member to group by username or email
export const sendEmailToInviteMember = async (
  user,
  dispatch,
  groupId,
  memberId
) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;

  try {
    const formData = new FormData();

    // append data
    formData.append("memberId", memberId);
    console.log(memberId);

    const res = await axios({
      method: "post",
      url: `/groups/${groupId}/invite`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    return res.response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// add member to group
export const addMemberFromToken = async (user, dispatch, token) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;

  try {
    const res = await axios({
      method: "get",
      url: `/groups/invite/${token}`,
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    return res.response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// get owner of group
export const getOwner = async (user, dispatch, groupId) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;

  try {
    const res = await axios.get(`groups/${groupId}/owner`, {
      headers: { token: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (err) {
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
  }
};

// get list co-owners of group
export const getListCoOwners = async (user, dispatch, groupId) => {
  const axios = createAxiosJWT(user, dispatch, loginSuccess);
  const accessToken = user?.accessToken;

  try {
    const res = await axios.get(`groups/${groupId}/co-owner`, {
      headers: { token: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (err) {
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
  }
};

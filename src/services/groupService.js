import { createAxiosJWT } from "./api";
import TokenService from "./tokenService";

const axios = createAxiosJWT();

// get list owned group
const getOwnedGroups = async () => {
  const user = TokenService.getUser();
  const id = user?.user?.id;

  try {
    const res = await axios.get(`users/${id}/groups/owned`);
    if (res.status === 200) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.log(error);

    return error;
  }
};

// get group by id
const getGroupById = async (groupId) => {
  try {
    const res = await axios.get(`groups/${groupId}`);
    if (res.status === 200) {
      return res.data;
    }
    return [];
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

// get list joined group
const getJoinedGroups = async () => {
  const user = TokenService.getUser();
  const id = user?.user?.id;

  const res = await axios.get(`users/${id}/groups/joined`).catch((error) => {
    console.log(error);
    return error;
  });
  if (res.status === 200) {
    return res.data;
  }

  return [];
};

const createGroup = async (groupInfo) => {
  const user = TokenService.getUser();
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
const joinTheGroup = async (groupId) => {
  try {
    const res = await axios.post(`groups/${groupId}/join`, groupId);

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
const getLitsMembers = async (groupId) => {
  const res = await axios.get(`groups/${groupId}/members`).catch((error) => {
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
const sendEmailToInviteMember = async (groupId, memberId) => {
  const user = TokenService.getUser();
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
        // "x-access-token": `Bearer ${accessToken}`,
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
const addMemberFromToken = async (token) => {
  const user = TokenService.getUser();
  const accessToken = user?.accessToken;

  try {
    const res = await axios({
      method: "get",
      url: `/groups/invite/${token}`,
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
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
const getOwner = async (groupId) => {
  try {
    const res = await axios.get(`groups/${groupId}/owner`);

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
const getListCoOwners = async (groupId) => {
  try {
    const res = await axios.get(`groups/${groupId}/co-owner`);

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

// terminate  co-owner out of group
const terminateCoOwner = async (groupId, userId) => {
  const user = TokenService.getUser();
  const accessToken = user?.accessToken;

  try {
    const res = await axios({
      method: "put",
      url: `groups/${groupId}/co-owner/${userId}/terminate`,
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
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

// assign  co-owner out of group
const assignCoOwner = async (groupId, userId) => {
  const user = TokenService.getUser();
  const accessToken = user?.accessToken;

  try {
    const res = await axios({
      method: "put",
      url: `groups/${groupId}/co-owner/${userId}/assign`,
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
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

// kickout member from group
const kickOutMember = async (groupId, userId) => {
  const user = TokenService.getUser();
  const accessToken = user?.accessToken;

  try {
    const res = await axios({
      method: "delete",
      url: `groups/${groupId}/members/${userId}/kickout`,
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
      },
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

const GroupService = {
  getOwnedGroups,
  getGroupById,
  getJoinedGroups,
  createGroup,
  joinTheGroup,
  getLitsMembers,
  sendEmailToInviteMember,
  addMemberFromToken,
  getOwner,
  getListCoOwners,
  terminateCoOwner,
  assignCoOwner,
  kickOutMember,
};

export default GroupService;

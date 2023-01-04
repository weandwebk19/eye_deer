import { createAxiosJWT } from "./api";

const axios = createAxiosJWT();

const createNewPresentation = async (presentation) => {
  try {
    const res = await axios.post(`presentations/create`, presentation);

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

const getCodePresentation = async (presentationId) => {
  try {
    const res = await axios.get(`presentations/${presentationId}/code`);

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

const removePresentationInGroup = async (groupId, presentationId) => {
  try {
    const res = await axios({
      method: "post",
      url: `/presentations/removeInGroup`,
      data: { groupId, presentationId },
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

const getUserIsVoted = async (presentationId, slideId, userId) => {
  try {
    const res = await axios.get(
      `presentations/${presentationId}/slides/${slideId}/users/${userId}/voted`
    );

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

const getChatMessages = async (presentationId) => {
  try {
    const res = await axios.get(
      `presentations/${presentationId}/chat/messages`
    );

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

const PresentationService = {
  createNewPresentation,
  getCodePresentation,
  removePresentationInGroup,
  getUserIsVoted,
  getChatMessages,
};

export default PresentationService;

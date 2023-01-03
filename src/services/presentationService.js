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

const removePresentation = async (presentationId) => {
  try {
    const res = await axios({
      method: "post",
      url: `/presentations/remove`,
      data: {presentationId},
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
}

const getMyPresentations = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `/presentations/my-presentations`,
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
      },
    });

    return res.data.data.presentations;
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
}

const getMyCoPresentations = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `/presentations/my-co-presentations`,
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
      },
    });

    return res.data.data.coPresentations;
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
}

const findPresentationsByName = async (namePresentation) => {
  try {
    const res = await axios({
      method: "post",
      url: `/presentations/find-by-name`,
      data: {namePresentation},
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
      },
    });

    return res.data.data.presentations;
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
}

const findPresentationById = async (presentationId) => {
  try {
    const res = await axios({
      method: "post",
      url: `/presentations/find-by-id`,
      data: {presentationId},
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": `Bearer ${accessToken}`,
      },
    });

    return res.data.data.presentation;
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
}

const updatePresentation = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `/presentations/update`,
      data,
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
}

const PresentationService = {
  createNewPresentation,
  updatePresentation,
  getCodePresentation,
  removePresentationInGroup,
  getUserIsVoted,
  removePresentation,
  getMyPresentations,
  getMyCoPresentations,
  findPresentationsByName,
  findPresentationById,
};

export default PresentationService;

import { createAxiosJWT } from "./api";

const axios = createAxiosJWT();

const createNewSlide = async (slide) => {
  try {
    console.log(slide);
    const res = await axios.post(`slides/create`, slide);

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

const getSlidesByPresentationId = async (presentationId) => {
  try {
    const res = await axios.get(`presentations/${presentationId}/slides`);

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

const increaseVote = async (presentationId, slideId, optionId, newVote) => {
  try {
    const res = await axios.put(`slides/${slideId}/option/${optionId}`, {
      presentationId,
      slideId,
      optionId,
      newVote,
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

const removeSlide = async (slideId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `/slides/${slideId}/delete`,
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

const SlideService = {
  createNewSlide,
  getSlidesByPresentationId,
  increaseVote,
  removeSlide,
};

export default SlideService;

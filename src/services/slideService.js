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

const SlideService = {
  createNewSlide,
  getSlidesByPresentationId,
  increaseVote,
};

export default SlideService;

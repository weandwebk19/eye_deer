import { createAxiosJWT } from "./api";

const axios = createAxiosJWT();

const createNewSlide = async (slide) => {
  try {
    const res = await axios.post(`slides/create`, slide);
    console.log(res);
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
    const res = await axios.delete(`/slides/${slideId}/delete`);
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

const updateCurrentSlide = async (slide) => {
  try {
    const res = await axios.put(`slides/${slide?.id}/update`, {
      slide,
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

const createNewOption = async (slide, optionSimple) => {
  try {
    const option = {
      ...optionSimple,
      contentId: slide.contentId,
    };
    const res = await axios.post(`slides/${slide.id}/option/create`, {
      option,
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

const changeSlideType = async (slide) => {
  try {
    const res = await axios.put(
      `slides/${slide?.id}/content/${slide.contentId}/type/${slide.typeId}/update`,
      {
        slide,
      }
    );

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

const deleteSlideType = async (slide) => {
  try {
    const res = await axios.delete(
      `slides/${slide?.id}/content/${slide.contentId}/delete`
    );

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
  removeSlide,
  updateCurrentSlide,
  createNewOption,
  changeSlideType,
  deleteSlideType,
};

export default SlideService;

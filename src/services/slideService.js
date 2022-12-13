import { createAxiosJWT } from "./api";

const axios = createAxiosJWT();

const createNewSlide = async (slide) => {
  try {
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
  const res = await axios
    .get(`slides/${presentationId}/slideList`)
    .catch((error) => {
      console.log(error);
      return error;
    });
  if (res.status === 200) {
    return res.data;
  }

  return [];
};

const SlideService = {
  createNewSlide,
  getSlidesByPresentationId,
};

export default SlideService;

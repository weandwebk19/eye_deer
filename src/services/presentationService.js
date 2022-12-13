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

const PresentationService = {
  createNewPresentation,
  getCodePresentation,
};

export default PresentationService;

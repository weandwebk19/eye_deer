import { CLICK_SLIDE, RESET_STATE } from "./types";

export const clickSlide = (data) => {
  return {
    type: CLICK_SLIDE,
    payload: data,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
    payload: {},
  };
};

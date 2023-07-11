export const GET_MOBILE_APP_SLIDERS_ACTION = {
  REQUEST: 'GET_MOBILE_APP_SLIDERS_REQUEST',
  ERROR: 'GET_MOBILE_APP_SLIDERS_ERROR',
  RESPONSE: 'GET_MOBILE_APP_SLIDERS_RESPONSE',
  RESET: 'GET_MOBILE_APP_SLIDERS_RESET',
};

export const getMobileAppSlidersRequest = () => ({
  type: GET_MOBILE_APP_SLIDERS_ACTION.REQUEST,
});

export const getMobileAppSlidersResponse = data => ({
  type: GET_MOBILE_APP_SLIDERS_ACTION.RESPONSE,
  data: data,
});

export const getMobileAppSlidersError = data => ({
  type: GET_MOBILE_APP_SLIDERS_ACTION.ERROR,
  data: data,
});

export const getMobileAppSlidersReset = () => ({
  type: GET_MOBILE_APP_SLIDERS_ACTION.RESET,
});

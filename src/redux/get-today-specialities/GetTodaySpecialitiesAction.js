export const GET_TODAY_SPECIALITIES_ACTION = {
  REQUEST: 'GET_TODAY_SPECIALITIES_REQUEST',
  ERROR: 'GET_TODAY_SPECIALITIES_ERROR',
  RESPONSE: 'GET_TODAY_SPECIALITIES_RESPONSE',
  RESET: 'GET_TODAY_SPECIALITIES_RESET',
};

export const getTodaySpecialitiesRequest = (data) => ({
  type: GET_TODAY_SPECIALITIES_ACTION.REQUEST,
  data: data,
});

export const getTodaySpecialitiesResponse = data => ({
  type: GET_TODAY_SPECIALITIES_ACTION.RESPONSE,
  data: data,
});

export const getTodaySpecialitiesError = data => ({
  type: GET_TODAY_SPECIALITIES_ACTION.ERROR,
  data: data,
});

export const getTodaySpecialitiesReset = () => ({
  type: GET_TODAY_SPECIALITIES_ACTION.RESET,
});

export const GET_POPULAR_CUISINES_ACTION = {
  REQUEST: 'GET_POPULAR_CUISINES_REQUEST',
  ERROR: 'GET_POPULAR_CUISINES_ERROR',
  RESPONSE: 'GET_POPULAR_CUISINES_RESPONSE',
  RESET: 'GET_POPULAR_CUISINES_RESET',
};

export const getPopularCuisinesRequest = (data) => ({
  type: GET_POPULAR_CUISINES_ACTION.REQUEST,
  data: data,
});

export const getPopularCuisinesResponse = data => ({
  type: GET_POPULAR_CUISINES_ACTION.RESPONSE,
  data: data,
});

export const getPopularCuisinesError = data => ({
  type: GET_POPULAR_CUISINES_ACTION.ERROR,
  data: data,
});

export const getPopularCuisinesReset = () => ({
  type: GET_POPULAR_CUISINES_ACTION.RESET,
});

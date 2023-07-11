export const GET_OUR_BRANDS_ACTION = {
  REQUEST: 'GET_OUR_BRANDS_REQUEST',
  ERROR: 'GET_OUR_BRANDS_ERROR',
  RESPONSE: 'GET_OUR_BRANDS_RESPONSE',
  RESET: 'GET_OUR_BRANDS_RESET',
};

export const getOurBrandsRequest = (data) => ({
  type: GET_OUR_BRANDS_ACTION.REQUEST,
  data: data,
});

export const getOurBrandsResponse = data => ({
  type: GET_OUR_BRANDS_ACTION.RESPONSE,
  data: data,
});

export const getOurBrandsError = data => ({
  type: GET_OUR_BRANDS_ACTION.ERROR,
  data: data,
});

export const getOurBrandsReset = () => ({
  type: GET_OUR_BRANDS_ACTION.RESET,
});

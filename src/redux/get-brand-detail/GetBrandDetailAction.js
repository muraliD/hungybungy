export const GET_OUR_BRANDS_DETAIL_ACTION = {
    REQUEST: 'GET_OUR_BRANDS_DETAIL_REQUEST',
    ERROR: 'GET_OUR_BRANDS_DETAIL_ERROR',
    RESPONSE: 'GET_OUR_BRANDS_DETAIL_RESPONSE',
    RESET: 'GET_OUR_BRANDS_DETAIL_RESET',
  };
  
  export const getOurBrandsDetailRequest = (data) => ({
    type: GET_OUR_BRANDS_DETAIL_ACTION.REQUEST,
    data: data,
  });
  
  export const getOurBrandsDetailResponse = data => ({
    type: GET_OUR_BRANDS_DETAIL_ACTION.RESPONSE,
    data: data,
  });
  
  export const getOurBrandsDetailError = data => ({
    type: GET_OUR_BRANDS_DETAIL_ACTION.ERROR,
    data: data,
  });
  
  export const getOurBrandsDetailReset = () => ({
    type: GET_OUR_BRANDS_DETAIL_ACTION.RESET,
  });
  
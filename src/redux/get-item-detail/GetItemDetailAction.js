export const GET_OUR_ITEMS_DETAIL_ACTION = {
    REQUEST: 'GET_OUR_ITEMS_DETAIL_REQUEST',
    ERROR: 'GET_OUR_ITEMS_DETAIL_ERROR',
    RESPONSE: 'GET_OUR_ITEMS_DETAIL_RESPONSE',
    RESET: 'GET_OUR_ITEMS_DETAIL_RESET',
  };
  
  export const getOurItemsDetailRequest = (data) => ({
    type: GET_OUR_ITEMS_DETAIL_ACTION.REQUEST,
    data: data,
  });
  
  export const getOurItemsDetailResponse = data => ({
    type: GET_OUR_ITEMS_DETAIL_ACTION.RESPONSE,
    data: data,
  });
  
  export const getOurItemsDetailError = data => ({
    type: GET_OUR_ITEMS_DETAIL_ACTION.ERROR,
    data: data,
  });
  
  export const getOurItemsDetailReset = () => ({
    type: GET_OUR_ITEMS_DETAIL_ACTION.RESET,
  });
  
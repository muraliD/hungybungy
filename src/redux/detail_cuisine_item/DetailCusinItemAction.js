export const DETAIL_CUSIN_ITEM_ACTION = {
    REQUEST: 'DETAIL_CUSIN_ITEM_ACTION_REQUEST',
    ERROR: 'DETAIL_CUSIN_ITEM_ACTION_ERROR',
    RESPONSE: 'DETAIL_CUSIN_ITEM_ACTION_RESPONSE',
    RESET: 'DETAIL_CUSIN_ITEM_ACTION_RESET',
  };
  
  export const detailCusinItemRequest = (data) => ({
    type: DETAIL_CUSIN_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const detailCusinItemResponse = data => ({
    type: DETAIL_CUSIN_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const detailCusinItemError = data => ({
    type: DETAIL_CUSIN_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const detailCusinItemReset = () => ({
    type: DETAIL_CUSIN_ITEM_ACTION .RESET,
  });
  
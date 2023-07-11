export const USER_ORDER_DETAILS_ACTION = {
    REQUEST: 'USER_ORDER_DETAILS_ACTION_REQUEST',
    ERROR: 'USER_ORDER_DETAILS_ACTION_ERROR',
    RESPONSE: 'USER_ORDER_DETAILS_ACTION_RESPONSE',
    RESET: 'USER_ORDER_DETAILS_ACTION_RESET',
  };
  
  export const userOrderDetailsRequest = (data) => ({
    type: USER_ORDER_DETAILS_ACTION .REQUEST,
    data: data,
  });
  
  export const userOrderDetailsResponse = data => ({
    type: USER_ORDER_DETAILS_ACTION .RESPONSE,
    data: data,
  });
  
  export const userOrderDetailsError = data => ({
    type: USER_ORDER_DETAILS_ACTION .ERROR,
    data: data,
  });
  
  export const userOrderDetailsReset = () => ({
    type: USER_ORDER_DETAILS_ACTION .RESET,
  });
  
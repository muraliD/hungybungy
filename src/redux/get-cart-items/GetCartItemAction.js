export const GET_CART_ITEM_ACTION = {
    REQUEST: 'GET_CART_ITEM_ACTION_REQUEST',
    ERROR: 'GET_CART_ITEM_ACTION_ERROR',
    RESPONSE: 'GET_CART_ITEM_ACTION_RESPONSE',
    RESET: 'GET_CART_ITEM_ACTION_RESET',
  };
  
  export const getCartItemRequest = (data) => ({
    type: GET_CART_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const getCartItemsResponse = data => ({
    type: GET_CART_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const getCartItemError = data => ({
    type: GET_CART_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const getCartItemReset = () => ({
    type: GET_CART_ITEM_ACTION .RESET,
  });
  
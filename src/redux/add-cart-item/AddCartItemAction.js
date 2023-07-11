export const ADD_CART_ITEM_ACTION = {
    REQUEST: 'ADD_CART_ITEM_ACTION_REQUEST',
    ERROR: 'ADD_CART_ITEM_ACTION_ERROR',
    RESPONSE: 'ADD_CART_ITEM_ACTION_RESPONSE',
    RESET: 'ADD_CART_ITEM_ACTION_RESET',
  };
  
  export const addCartItemRequest = (data) => ({
    type: ADD_CART_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const addCartItemResponse = data => ({
    type: ADD_CART_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const addCartItemError = data => ({
    type: ADD_CART_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const addCartItemReset = () => ({
    type: ADD_CART_ITEM_ACTION .RESET,
  });
  
export const UPDATE_CART_ITEM_ACTION = {
    REQUEST: 'UPDATE_CART_ITEM_ACTION_REQUEST',
    ERROR: 'UPDATE_CART_ITEM_ACTION_ERROR',
    RESPONSE: 'UPDATE_CART_ITEM_ACTION_RESPONSE',
    RESET: 'UPDATE_CART_ITEM_ACTION_RESET',
  };
  
  export const updateCartItemRequest = (data) => ({
    type: UPDATE_CART_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const updateCartItemsResponse = data => ({
    type: UPDATE_CART_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const updateCartItemError = data => ({
    type: UPDATE_CART_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const updateCartItemReset = () => ({
    type: UPDATE_CART_ITEM_ACTION .RESET,
  });
  
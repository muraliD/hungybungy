export const DELETE_CART_ITEM_ACTION = {
    REQUEST: 'DELETE_CART_ITEM_ACTION_REQUEST',
    ERROR: 'DELETE_CART_ITEM_ACTION_ERROR',
    RESPONSE: 'DELETE_CART_ITEM_ACTION_RESPONSE',
    RESET: 'DELETE_CART_ITEM_ACTION_RESET',
  };
  
  export const deleteCartItemRequest = (data) => ({
    type: DELETE_CART_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const deleteCartItemsResponse = data => ({
    type: DELETE_CART_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const deleteCartItemError = data => ({
    type: DELETE_CART_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const deleteCartItemReset = () => ({
    type: DELETE_CART_ITEM_ACTION .RESET,
  });
  
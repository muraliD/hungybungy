export const ADDRESS_CART_ITEM_ACTION = {
    REQUEST: 'ADDRESS_CART_ITEM_ACTION_REQUEST',
    ERROR: 'ADDRESS_CART_ITEM_ACTION_ERROR',
    RESPONSE: 'ADDRESS_CART_ITEM_ACTION_RESPONSE',
    RESET: 'ADDRESS_CART_ITEM_ACTION_RESET',
  };
  
  export const addressCartItemRequest = (data) => ({
    type: ADDRESS_CART_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const addressCartItemsResponse = data => ({
    type: ADDRESS_CART_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const addressCartItemError = data => ({
    type: ADDRESS_CART_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const addressCartItemReset = () => ({
    type: ADDRESS_CART_ITEM_ACTION .RESET,
  });
  
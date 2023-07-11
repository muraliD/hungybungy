export const CREATE_CART_ITEM_ACTION = {
    REQUEST: 'CREATE_CART_ITEM_ACTION_REQUEST',
    ERROR: 'CREATE_CART_ITEM_ACTION_ERROR',
    RESPONSE: 'CREATE_CART_ITEM_ACTION_RESPONSE',
    RESET: 'CREATE_CART_ITEM_ACTION_RESET',
  };
  
  export const createCartItemRequest = (data) => ({
    type: CREATE_CART_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const createCartItemsResponse = data => ({
    type: CREATE_CART_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const createCartItemError = data => ({
    type: CREATE_CART_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const createCartItemReset = () => ({
    type: CREATE_CART_ITEM_ACTION .RESET,
  });
  
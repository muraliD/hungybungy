export const PURCHASE_CART_ITEM_ACTION = {
    REQUEST: 'PURCHASE_CART_ITEM_ACTION_REQUEST',
    ERROR: 'PURCHASE_CART_ITEM_ACTION_ERROR',
    RESPONSE: 'PURCHASE_CART_ITEM_ACTION_RESPONSE',
    RESET: 'PURCHASE_CART_ITEM_ACTION_RESET',
  };
  
  export const purchaseCartItemRequest = (data) => ({
    type: PURCHASE_CART_ITEM_ACTION .REQUEST,
    data: data,
  });
  
  export const purchaseCartItemsResponse = data => ({
    type: PURCHASE_CART_ITEM_ACTION .RESPONSE,
    data: data,
  });
  
  export const purchaseCartItemError = data => ({
    type: PURCHASE_CART_ITEM_ACTION .ERROR,
    data: data,
  });
  
  export const purchaseCartItemReset = () => ({
    type: PURCHASE_CART_ITEM_ACTION .RESET,
  });
  
export const APPLY_COUPON_CART_ACTION = {
    REQUEST: 'APPLY_COUPON_CART_ACTION_REQUEST',
    ERROR: 'APPLY_COUPON_CART_ACTION_ERROR',
    RESPONSE: 'APPLY_COUPON_CART_ACTION_RESPONSE',
    RESET: 'APPLY_COUPON_CART_ACTION_RESET',
  };
  
  export const applyCouponCartRequest = (data) => ({
    type: APPLY_COUPON_CART_ACTION .REQUEST,
    data: data,
  });
  
  export const applyCouponCartResponse = data => ({
    type: APPLY_COUPON_CART_ACTION .RESPONSE,
    data: data,
  });
  
  export const applyCouponCartError = data => ({
    type: APPLY_COUPON_CART_ACTION .ERROR,
    data: data,
  });
  
  export const applyCouponCartReset = () => ({
    type: APPLY_COUPON_CART_ACTION .RESET,
  });
  
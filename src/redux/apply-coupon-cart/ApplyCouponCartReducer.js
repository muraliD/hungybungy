
import { APPLY_COUPON_CART_ACTION } from './ApplyCouponCartAction';


export function applyCouponCartState() {
  return {
    applyCouponCartStateLoading: false,
    applyCouponCartStateResponse: null,
    applyCouponCartStateError: null,
  };
}

const applyCouponCartReducer = (state, action) => {
  
  if (!state || action.type === APPLY_COUPON_CART_ACTION.RESET) {
    return applyCouponCartState();
  }

  switch (action.type) {
    
    
    case APPLY_COUPON_CART_ACTION.REQUEST:
      return {...state, applyCouponCartStateLoading: true, applyCouponCartStateError: null};
    case APPLY_COUPON_CART_ACTION.ERROR:
      return {
        ...state,
        applyCouponCartStateLoading: false,
        applyCouponCartStateError: action.data,
      };
    case APPLY_COUPON_CART_ACTION.RESPONSE:

    
      return {
        ...state,
        applyCouponCartStateLoading: false,
        applyCouponCartStateResponse: action.data,
      };
  }
  return state;
};

export default applyCouponCartReducer;

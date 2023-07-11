
import { USER_ORDER_DETAILS_ACTION } from './UserOrderDetailsAction';


export function userOrderDetailsState() {
  return {
    userOrderDetailsStateLoading: false,
    userOrderDetailsStateResponse: null,
    userOrderDetailsStateError: null,
  };
}

const userOrderDetailsReducer = (state, action) => {
  
  if (!state || action.type === USER_ORDER_DETAILS_ACTION.RESET) {
    return userOrderDetailsState();
  }

  switch (action.type) {
    
    
    case USER_ORDER_DETAILS_ACTION.REQUEST:
      return {...state, userOrderDetailsStateLoading: true, userOrderDetailsStateError: null};
    case USER_ORDER_DETAILS_ACTION.ERROR:
      return {
        ...state,
        userOrderDetailsStateLoading: false,
        userOrderDetailsStateError: action.data,
      };
    case USER_ORDER_DETAILS_ACTION.RESPONSE:

    
      return {
        ...state,
        userOrderDetailsStateLoading: false,
        userOrderDetailsStateResponse: action.data,
      };
  }
  return state;
};

export default userOrderDetailsReducer;


import { USER_MOBILE_UPDATE_ACTION } from './UserMobileUpdateAction';


export function userMobileUpdateState() {
  return {
    userMobileUpdateStateLoading: false,
    userMobileUpdateStateResponse: null,
    userMobileUpdateStateError: null,
  };
}

const userMobileUpdateReducer = (state, action) => {
  
  if (!state || action.type === USER_MOBILE_UPDATE_ACTION.RESET) {
    return userMobileUpdateState();
  }

  switch (action.type) {
    
    
    case USER_MOBILE_UPDATE_ACTION.REQUEST:
      return {...state, userMobileUpdateStateLoading: true, userMobileUpdateStateError: null};
    case USER_MOBILE_UPDATE_ACTION.ERROR:
      return {
        ...state,
        userMobileUpdateStateLoading: false,
        userMobileUpdateStateError: action.data,
      };
    case USER_MOBILE_UPDATE_ACTION.RESPONSE:

    
      return {
        ...state,
        userMobileUpdateStateLoading: false,
        userMobileUpdateStateResponse: action.data,
      };
  }
  return state;
};

export default userMobileUpdateReducer;

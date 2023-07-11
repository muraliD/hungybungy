
import { USER_PROFILE_UPDATE_ACTION } from './UserProfileUpdateAction';


export function userProfileUpdateState() {
  return {
    userProfileUpdateStateLoading: false,
    userProfileUpdateStateResponse: null,
    userProfileUpdateStateError: null,
  };
}

const userProfileUpdateReducer = (state, action) => {
  
  if (!state || action.type === USER_PROFILE_UPDATE_ACTION.RESET) {
    return userProfileUpdateState();
  }

  switch (action.type) {
    
    
    case USER_PROFILE_UPDATE_ACTION.REQUEST:
      return {...state, userProfileUpdateStateLoading: true, userProfileUpdateStateError: null};
    case USER_PROFILE_UPDATE_ACTION.ERROR:
      return {
        ...state,
        userProfileUpdateStateLoading: false,
        userProfileUpdateStateError: action.data,
      };
    case USER_PROFILE_UPDATE_ACTION.RESPONSE:

    
      return {
        ...state,
        userProfileUpdateStateLoading: false,
        userProfileUpdateStateResponse: action.data,
      };
  }
  return state;
};

export default userProfileUpdateReducer;

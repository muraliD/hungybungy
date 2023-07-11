
import { USER_PROFILE_DATA_ACTION } from './UserProfileDataAction';


export function userProfileDataState() {
  return {
    userProfileDataStateLoading: false,
    userProfileDataStateResponse: null,
    userProfileDataStateError: null,
  };
}

const userProfileDataReducer = (state, action) => {
  
  if (!state || action.type === USER_PROFILE_DATA_ACTION.RESET) {
    return userProfileDataState();
  }

  switch (action.type) {
    
    
    case USER_PROFILE_DATA_ACTION.REQUEST:
      return {...state, userProfileDataStateLoading: true, userProfileDataStateError: null};
    case USER_PROFILE_DATA_ACTION.ERROR:
      return {
        ...state,
        userProfileDataStateLoading: false,
        userProfileDataStateError: action.data,
      };
    case USER_PROFILE_DATA_ACTION.RESPONSE:

    debugger
      return {
        ...state,
        userProfileDataStateLoading: false,
        userProfileDataStateResponse: action.data,
      };
  }
  return state;
};

export default userProfileDataReducer;


import { USER_BINGO_DETAILS_ACTION } from './UserBingoDetailsAction';


export function userBingoDetailsState() {
  return {
    userBingoDetailsStateLoading: false,
    userBingoDetailsStateResponse: null,
    userBingoDetailsStateError: null,
  };
}

const userBingoDetailsReducer = (state, action) => {
  
  if (!state || action.type === USER_BINGO_DETAILS_ACTION.RESET) {
    return userBingoDetailsState();
  }

  switch (action.type) {
    
    
    case USER_BINGO_DETAILS_ACTION.REQUEST:
      return {...state, userBingoDetailsStateLoading: true, userBingoDetailsStateError: null};
    case USER_BINGO_DETAILS_ACTION.ERROR:
      return {
        ...state,
        userBingoDetailsStateLoading: false,
        userBingoDetailsStateError: action.data,
      };
    case USER_BINGO_DETAILS_ACTION.RESPONSE:

    
      return {
        ...state,
        userBingoDetailsStateLoading: false,
        userBingoDetailsStateResponse: action.data,
      };
  }
  return state;
};

export default userBingoDetailsReducer;

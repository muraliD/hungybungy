import {SIGNUP_DETAILS_ACTION} from './SignupDetailsAction';
// export interface SignupDetailsState {
//   isSignupDetailsLoading: boolean;
//   signupDetailsResponse: any;
//   signupDetailsError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultSignupDetailsState() {
  return {
    isSignupDetailsLoading: false,
    signupDetailsResponse: null,
    signupDetailsError: null,
  };
}

const signupDetailsReducer = (state, action) => {
  if (!state || action.type === SIGNUP_DETAILS_ACTION.RESET) {
    return defaultSignupDetailsState();
  }

  switch (action.type) {
    case SIGNUP_DETAILS_ACTION.REQUEST:
      return {...state, isSignupDetailsLoading: true, signupDetailsError: null};
    case SIGNUP_DETAILS_ACTION.ERROR:
      return {
        ...state,
        isSignupDetailsLoading: false,
        signupDetailsError: action.data,
      };
    case SIGNUP_DETAILS_ACTION.RESPONSE:
      return {
        ...state,
        isSignupDetailsLoading: false,
        signupDetailsResponse: action.data,
      };
  }
  return state;
};

export default signupDetailsReducer;

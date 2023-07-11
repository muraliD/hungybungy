import {MOBILE_LOGIN_ACTION} from './MobileLoginAction';
// export interface MobileLoginState {
//   isLoginLoading: boolean;
//   mobileLoginResponse: any;
//   mobileLoginError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultMobileLoginState() {
  return {
    isLoginLoading: false,
    mobileLoginResponse: null,
    mobileLoginError: null,
  };
}

const mobileLoginReducer = (state, action) => {
  if (!state || action.type === MOBILE_LOGIN_ACTION.RESET) {
    return defaultMobileLoginState();
  }

  switch (action.type) {
    case MOBILE_LOGIN_ACTION.REQUEST:
      return {...state, isLoginLoading: true, mobileLoginError: null};
    case MOBILE_LOGIN_ACTION.ERROR:
      return {...state, isLoginLoading: false, mobileLoginError: action.data};
    case MOBILE_LOGIN_ACTION.RESPONSE:
      return {
        ...state,
        isLoginLoading: false,
        mobileLoginResponse: action.data,
      };
  }
  return state;
};

export default mobileLoginReducer;

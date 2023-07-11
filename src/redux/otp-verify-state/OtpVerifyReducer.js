import {OTP_VERIFY_ACTION} from './OtpVerifyAction';
// export interface OtpVerifyState {
//   isOtpVerifyLoading: boolean;
//   otpVerifyResponse: any;
//   otpVerifyError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultOtpVerifyState() {
  return {
    isOtpVerifyLoading: false,
    otpVerifyResponse: null,
    otpVerifyError: null,
  };
}

const otpVerifyReducer = (state, action) => {
  if (!state || action.type === OTP_VERIFY_ACTION.RESET) {
    return defaultOtpVerifyState();
  }

  switch (action.type) {
    case OTP_VERIFY_ACTION.REQUEST:
      return {...state, isOtpVerifyLoading: true, otpVerifyError: null};
    case OTP_VERIFY_ACTION.ERROR:
      return {...state, isOtpVerifyLoading: false, otpVerifyError: action.data};
    case OTP_VERIFY_ACTION.RESPONSE:
      return {
        ...state,
        isOtpVerifyLoading: false,
        otpVerifyResponse: action.data,
      };
  }
  return state;
};

export default otpVerifyReducer;

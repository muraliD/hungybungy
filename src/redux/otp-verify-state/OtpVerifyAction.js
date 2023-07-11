export const OTP_VERIFY_ACTION = {
  REQUEST: 'OTP_VERIFY_REQUEST',
  ERROR: 'OTP_VERIFY_ERROR',
  RESPONSE: 'OTP_VERIFY_RESPONSE',
  RESET: 'OTP_VERIFY_RESET',
};

export const otpVerifyRequest = data => ({
  type: OTP_VERIFY_ACTION.REQUEST,
  data: data,
});

export const otpVerifyResponse = data => ({
  type: OTP_VERIFY_ACTION.RESPONSE,
  data: data,
});

export const otpVerifyError = data => ({
  type: OTP_VERIFY_ACTION.ERROR,
  data: data,
});

export const otpVerifyReset = () => ({
  type: OTP_VERIFY_ACTION.RESET,
});

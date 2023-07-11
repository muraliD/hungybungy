export const MOBILE_LOGIN_ACTION = {
  REQUEST: 'MOBILE_LOGIN_REQUEST',
  ERROR: 'MOBILE_LOGIN_ERROR',
  RESPONSE: 'MOBILE_LOGIN_RESPONSE',
  RESET: 'MOBILE_LOGIN_RESET',
};

export const mobileLoginRequest = data => ({
  type: MOBILE_LOGIN_ACTION.REQUEST,
  data: data,
});

export const mobileLoginResponse = data => ({
  type: MOBILE_LOGIN_ACTION.RESPONSE,
  data: data,
});

export const mobileLoginError = data => ({
  type: MOBILE_LOGIN_ACTION.ERROR,
  data: data,
});

export const mobileLoginReset = () => ({
  type: MOBILE_LOGIN_ACTION.RESET,
});

export const SIGNUP_DETAILS_ACTION = {
  REQUEST: 'SIGNUP_DETAILS_REQUEST',
  ERROR: 'SIGNUP_DETAILS_ERROR',
  RESPONSE: 'SIGNUP_DETAILS_RESPONSE',
  RESET: 'SIGNUP_DETAILS_RESET',
};

export const signupDetailsRequest = data => ({
  type: SIGNUP_DETAILS_ACTION.REQUEST,
  data: data,
});

export const signupDetailsResponse = data => ({
  type: SIGNUP_DETAILS_ACTION.RESPONSE,
  data: data,
});

export const signupDetailsError = data => ({
  type: SIGNUP_DETAILS_ACTION.ERROR,
  data: data,
});

export const signupDetailsReset = () => ({
  type: SIGNUP_DETAILS_ACTION.RESET,
});

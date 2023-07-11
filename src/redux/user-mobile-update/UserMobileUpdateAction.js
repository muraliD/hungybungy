export const USER_MOBILE_UPDATE_ACTION = {
    REQUEST: 'USER_MOBILE_UPDATE_ACTION_REQUEST',
    ERROR: 'USER_MOBILE_UPDATE_ACTION_ERROR',
    RESPONSE: 'USER_MOBILE_UPDATE_ACTION_RESPONSE',
    RESET: 'USER_MOBILE_UPDATE_ACTION_RESET',
  };
  
  export const userMobileUpdateRequest = (data) => ({
    type: USER_MOBILE_UPDATE_ACTION .REQUEST,
    data: data,
  });
  
  export const userMobileUpdateResponse = data => ({
    type: USER_MOBILE_UPDATE_ACTION .RESPONSE,
    data: data,
  });
  
  export const userMobileUpdateError = data => ({
    type: USER_MOBILE_UPDATE_ACTION .ERROR,
    data: data,
  });
  
  export const userMobileUpdateReset = () => ({
    type: USER_MOBILE_UPDATE_ACTION .RESET,
  });
  
export const USER_PROFILE_DATA_ACTION = {
    REQUEST: 'USER_PROFILE_DATA_ACTION_REQUEST',
    ERROR: 'USER_PROFILE_DATA_ACTION_ERROR',
    RESPONSE: 'USER_PROFILE_DATA_ACTION_RESPONSE',
    RESET: 'USER_PROFILE_DATA_ACTION_RESET',
  };
  
  export const userProfileDataRequest = (data) => ({
    type: USER_PROFILE_DATA_ACTION .REQUEST,
    data: data,
  });
  
  export const userProfileDataResponse = data => ({
    type: USER_PROFILE_DATA_ACTION .RESPONSE,
    data: data,
  });
  
  export const userProfileDataError = data => ({
    type: USER_PROFILE_DATA_ACTION .ERROR,
    data: data,
  });
  
  export const userProfileDataReset = () => ({
    type: USER_PROFILE_DATA_ACTION .RESET,
  });
  
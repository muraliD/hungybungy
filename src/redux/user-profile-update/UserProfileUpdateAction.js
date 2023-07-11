export const USER_PROFILE_UPDATE_ACTION = {
    REQUEST: 'USER_PROFILE_UPDATE_ACTION_REQUEST',
    ERROR: 'USER_PROFILE_UPDATE_ACTION_ERROR',
    RESPONSE: 'USER_PROFILE_UPDATE_ACTION_RESPONSE',
    RESET: 'USER_PROFILE_UPDATE_ACTION_RESET',
  };
  
  export const userProfileUpdateRequest = (data) => ({
    type: USER_PROFILE_UPDATE_ACTION .REQUEST,
    data: data,
  });
  
  export const userProfileUpdateResponse = data => ({
    type: USER_PROFILE_UPDATE_ACTION .RESPONSE,
    data: data,
  });
  
  export const userProfileUpdateError = data => ({
    type: USER_PROFILE_UPDATE_ACTION .ERROR,
    data: data,
  });
  
  export const userProfileUpdateReset = () => ({
    type: USER_PROFILE_UPDATE_ACTION .RESET,
  });
  
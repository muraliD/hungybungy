export const UPDATE_ADDRESS_USERS_ACTION = {
    REQUEST: 'UPDATE_ADDRESS_USERS_ACTION_REQUEST',
    ERROR: 'UPDATE_ADDRESS_USERS_ACTION_ERROR',
    RESPONSE: 'UPDATE_ADDRESS_USERS_ACTION_RESPONSE',
    RESET: 'UPDATE_ADDRESS_USERS_ACTION_RESET',
  };
  
  export const updateAddressUsersRequest = (data) => ({
    type: UPDATE_ADDRESS_USERS_ACTION .REQUEST,
    data: data,
  });
  
  export const updateAddressUsersResponse = data => ({
    type: UPDATE_ADDRESS_USERS_ACTION .RESPONSE,
    data: data,
  });
  
  export const updateAddressUsersError = data => ({
    type: UPDATE_ADDRESS_USERS_ACTION .ERROR,
    data: data,
  });
  
  export const updateAddressUsersReset = () => ({
    type: UPDATE_ADDRESS_USERS_ACTION .RESET,
  });
  
export const ADD_ADDRESS_USERS_ACTION = {
    REQUEST: 'ADD_ADDRESS_USERS_ACTION_REQUEST',
    ERROR: 'ADD_ADDRESS_USERS_ACTION_ERROR',
    RESPONSE: 'ADD_ADDRESS_USERS_ACTION_RESPONSE',
    RESET: 'ADD_ADDRESS_USERS_ACTION_RESET',
  };
  
  export const addAddressUsersRequest = (data) => ({
    type: ADD_ADDRESS_USERS_ACTION .REQUEST,
    data: data,
  });
  
  export const addAddressUsersResponse = data => ({
    type: ADD_ADDRESS_USERS_ACTION .RESPONSE,
    data: data,
  });
  
  export const addAddressUsersError = data => ({
    type: ADD_ADDRESS_USERS_ACTION .ERROR,
    data: data,
  });
  
  export const addAddressUsersReset = () => ({
    type: ADD_ADDRESS_USERS_ACTION .RESET,
  });
  
export const DELETE_ADDRESS_USERS_ACTION = {
    REQUEST: 'DELETE_ADDRESS_USERS_ACTION_REQUEST',
    ERROR: 'DELETE_ADDRESS_USERS_ACTION_ERROR',
    RESPONSE: 'DELETE_ADDRESS_USERS_ACTION_RESPONSE',
    RESET: 'DELETE_ADDRESS_USERS_ACTION_RESET',
  };
  
  export const deleteAddressUsersRequest = (data) => ({
    type: DELETE_ADDRESS_USERS_ACTION .REQUEST,
    data: data,
  });
  
  export const deleteAddressUsersResponse = data => ({
    type: DELETE_ADDRESS_USERS_ACTION .RESPONSE,
    data: data,
  });
  
  export const deleteAddressUsersError = data => ({
    type: DELETE_ADDRESS_USERS_ACTION .ERROR,
    data: data,
  });
  
  export const deleteAddressUsersReset = () => ({
    type: DELETE_ADDRESS_USERS_ACTION .RESET,
  });
  
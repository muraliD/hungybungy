export const STORE_ADDRESS_USERS_ACTION = {
    REQUEST: 'STORE_ADDRESS_USERS_ACTION_REQUEST',
    ERROR: 'STORE_ADDRESS_USERS_ACTION_ERROR',
    RESPONSE: 'STORE_ADDRESS_USERS_ACTION_RESPONSE',
    RESET: 'STORE_ADDRESS_USERS_ACTION_RESET',
  };
  
  export const storeAddressUsersRequest = (data) => ({
    type: STORE_ADDRESS_USERS_ACTION .REQUEST,
    data: data,
  });
  
  export const storeAddressUsersResponse = data => ({
    type: STORE_ADDRESS_USERS_ACTION .RESPONSE,
    data: data,
  });
  
  export const storeAddressUsersError = data => ({
    type: STORE_ADDRESS_USERS_ACTION .ERROR,
    data: data,
  });
  
  export const addAddressUsersReset = () => ({
    type: STORE_ADDRESS_USERS_ACTION .RESET,
  });
  

import { STORE_ADDRESS_USERS_ACTION } from './StoreAddressUsersAction';


export function storeAddressUsersState() {
  return {
    storeAddressUsersStateLoading: false,
    storeAddressUsersStateResponse: "0",
    storeAddressUsersStateError: null,
  };
}

const storeAddressUserReducer = (state, action) => {
  
  if (!state || action.type === STORE_ADDRESS_USERS_ACTION.RESET) {
    return storeAddressUsersState();
  }

  switch (action.type) {
    
    
    case STORE_ADDRESS_USERS_ACTION.REQUEST:
      return {...state, storeAddressUsersStateLoading: true, storeAddressUsersStateError: null};
    case STORE_ADDRESS_USERS_ACTION.ERROR:
      return {
        ...state,
        storeAddressUsersStateLoading: false,
        storeAddressUsersStateError: action.data,
      };
    case STORE_ADDRESS_USERS_ACTION.RESPONSE:

    debugger

    
      return {
        ...state,
        storeAddressUsersStateLoading: false,
        storeAddressUsersStateResponse: action.data,
      };
  }
  return state;
};

export default storeAddressUserReducer;

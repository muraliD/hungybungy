
import { ADD_ADDRESS_USERS_ACTION } from './AddAddressUsersAction';


export function addAddressUsersState() {
  return {
    addAddressUsersStateLoading: false,
    addAddressUsersStateResponse: null,
    addAddressUsersStateError: null,
  };
}

const addAddressUserReducer = (state, action) => {
  
  if (!state || action.type === ADD_ADDRESS_USERS_ACTION.RESET) {
    return addAddressUsersState();
  }

  switch (action.type) {
    
    
    case ADD_ADDRESS_USERS_ACTION.REQUEST:
      return {...state, addAddressUsersStateLoading: true, addAddressUsersStateError: null};
    case ADD_ADDRESS_USERS_ACTION.ERROR:
      return {
        ...state,
        addAddressUsersStateLoading: false,
        addAddressUsersStateError: action.data,
      };
    case ADD_ADDRESS_USERS_ACTION.RESPONSE:

    
      return {
        ...state,
        addAddressUsersStateLoading: false,
        addAddressUsersStateResponse: action.data,
      };
  }
  return state;
};

export default addAddressUserReducer;

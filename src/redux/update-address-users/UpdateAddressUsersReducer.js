
import { UPDATE_ADDRESS_USERS_ACTION } from './UpdateAddressUsersAction';


export function updateAddressUsersState() {
  return {
    updateAddressUsersStateLoading: false,
    updateAddressUsersStateResponse: null,
    updateAddressUsersStateError: null,
  };
}

const  updateAddressUserReducer = (state, action) => {
  
  if (!state || action.type === UPDATE_ADDRESS_USERS_ACTION.RESET) {
    return  updateAddressUsersState();
  }

  switch (action.type) {
    
    
    case UPDATE_ADDRESS_USERS_ACTION.REQUEST:
      return {...state, updateAddressUsersStateLoading: true, updateAddressUsersStateError: null};
    case UPDATE_ADDRESS_USERS_ACTION.ERROR:
      return {
        ...state,
        updateAddressUsersStateLoading: false,
        updateAddressUsersStateError: action.data,
      };
    case UPDATE_ADDRESS_USERS_ACTION.RESPONSE:

    
      return {
        ...state,
        updateAddressUsersStateLoading: false,
        updateAddressUsersStateResponse: action.data,
      };
  }
  return state;
};

export default updateAddressUserReducer;

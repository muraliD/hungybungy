
import { DELETE_ADDRESS_USERS_ACTION } from './DeleteAddressUsersAction';


export function deleteAddressState() {
  return {
    deleteAddressUsersStateLoading: false,
    deleteAddressUsersStateResponse: null,
    deleteAddressUsersStateError: null,
  };
}

const deleteAddressUserReducer = (state, action) => {
  
  if (!state || action.type === DELETE_ADDRESS_USERS_ACTION.RESET) {
    return deleteAddressState();
  }

  switch (action.type) {
    
    
    case DELETE_ADDRESS_USERS_ACTION.REQUEST:
      return {...state, deleteAddressUsersStateLoading: true, deleteAddressUsersStateError: null};
    case DELETE_ADDRESS_USERS_ACTION.ERROR:
      return {
        ...state,
        deleteAddressUsersStateLoading: false,
        deleteAddressUsersStateError: action.data,
      };
    case DELETE_ADDRESS_USERS_ACTION.RESPONSE:

    
      return {
        ...state,
        deleteAddressUsersStateLoading: false,
        deleteAddressUsersStateResponse: action.data,
      };
  }
  return state;
};

export default deleteAddressUserReducer;

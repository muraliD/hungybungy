
import { ADDRESS_CART_ITEM_ACTION } from './AddressCartItemAction';


export function addressCartItemState() {
  return {
    addressCartItemStateLoading: false,
    addressCartItemStateResponse: null,
    addressCartItemStateError: null,
  };
}

const addressCartItemReducer = (state, action) => {
  
  if (!state || action.type === ADDRESS_CART_ITEM_ACTION.RESET) {
    return addressCartItemState();
  }

  switch (action.type) {
    
    
    case ADDRESS_CART_ITEM_ACTION.REQUEST:
      return {...state, addressCartItemStateLoading: true, addressCartItemStateError: null};
    case ADDRESS_CART_ITEM_ACTION.ERROR:
      return {
        ...state,
        addressCartItemStateLoading: false,
        addressCartItemStateError: action.data,
      };
    case ADDRESS_CART_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        addressCartItemStateLoading: false,
        addressCartItemStateResponse: action.data,
      };
  }
  return state;
};

export default addressCartItemReducer;

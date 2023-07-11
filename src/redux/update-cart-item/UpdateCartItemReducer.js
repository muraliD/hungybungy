
import { UPDATE_CART_ITEM_ACTION } from './UpdateCartItemAction';


export function updateCartItemState() {
  return {
    upadteCartItemStateLoading: false,
    updateCartItemStateResponse: null,
    updateCartItemStateError: null,
  };
}

const updateCartItemReducer = (state, action) => {
  
  if (!state || action.type === UPDATE_CART_ITEM_ACTION.RESET) {
    return updateCartItemState();
  }

  switch (action.type) {
    
    
    case UPDATE_CART_ITEM_ACTION.REQUEST:
      return {...state, upadteCartItemStateLoading: true, updateCartItemStateError: null};
    case UPDATE_CART_ITEM_ACTION.ERROR:
      return {
        ...state,
        upadteCartItemStateLoading: false,
        updateCartItemStateError: action.data,
      };
    case UPDATE_CART_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        upadteCartItemStateLoading: false,
        updateCartItemStateResponse: action.data,
      };
  }
  return state;
};

export default updateCartItemReducer;

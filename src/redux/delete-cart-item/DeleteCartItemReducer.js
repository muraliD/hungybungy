
import { DELETE_CART_ITEM_ACTION } from './DeleteCartItemAction';


export function deleteCartItemState() {
  return {
    deleteCartItemStateLoading: false,
    deleteCartItemStateResponse: null,
    deleteCartItemStateError: null,
  };
}

const deleteCartItemReducer = (state, action) => {
  
  if (!state || action.type === DELETE_CART_ITEM_ACTION.RESET) {
    return deleteCartItemState();
  }

  switch (action.type) {
    
    
    case DELETE_CART_ITEM_ACTION.REQUEST:
      return {...state, deleteCartItemStateLoading: true, deleteCartItemStateError: null};
    case DELETE_CART_ITEM_ACTION.ERROR:
      return {
        ...state,
        deleteCartItemStateLoading: false,
        deleteCartItemStateError: action.data,
      };
    case DELETE_CART_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        deleteCartItemStateLoading: false,
        deleteCartItemStateResponse: action.data,
      };
  }
  return state;
};

export default deleteCartItemReducer;

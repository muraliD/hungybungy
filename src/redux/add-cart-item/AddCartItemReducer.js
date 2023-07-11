
import { ADD_CART_ITEM_ACTION } from './AddCartItemAction';


export function defaultAddCartItemState() {
  return {
    isAddCartItemLoading: false,
    getAddCartItemResponse: null,
    getAddCartItemError: null,
  };
}

const defaultAddCartItemReducer = (state, action) => {
  if (!state || action.type === ADD_CART_ITEM_ACTION.RESET) {
    return defaultAddCartItemState();
  }

  switch (action.type) {
    
    case ADD_CART_ITEM_ACTION.REQUEST:
      return {...state, isAddCartItemLoading: true, getAddCartItemError: null};
    case ADD_CART_ITEM_ACTION.ERROR:
      return {
        ...state,
        isAddCartItemLoading: false,
        getAddCartItemError: action.data,
      };
    case ADD_CART_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        isAddCartItemLoading: false,
        getAddCartItemResponse: action.data,
      };
  }
  return state;
};

export default defaultAddCartItemReducer;

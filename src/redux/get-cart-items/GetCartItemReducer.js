
import { GET_CART_ITEM_ACTION } from './GetCartItemAction';


export function defaultGetCartItemState() {
  return {
    isGetCartItemLoading: false,
    getCartItemResponse: null,
    getACartItemError: null,
  };
}

const getCartItemReducer = (state, action) => {

  if (!state || action.type === GET_CART_ITEM_ACTION.RESET) {
    return defaultGetCartItemState();
  }

  switch (action.type) {
    
    
    case GET_CART_ITEM_ACTION.REQUEST:
      return {...state, isGetCartItemLoading: true, getACartItemError: null};
    case GET_CART_ITEM_ACTION.ERROR:
      return {
        ...state,
        isGetCartItemLoading: false,
        getACartItemError: action.data,
      };
    case GET_CART_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        isGetCartItemLoading: false,
        getCartItemResponse: action.data,
      };
  }
  return state;
};

export default getCartItemReducer;

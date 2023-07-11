
import { CREATE_CART_ITEM_ACTION } from './CreateCartItemAction';


export function createCartItemState() {
  return {
    createCartItemStateLoading: false,
    createCartItemStateResponse: null,
    createCartItemStateError: null,
  };
}

const createCartItemReducer = (state, action) => {
  
  if (!state || action.type === CREATE_CART_ITEM_ACTION.RESET) {
    return createCartItemState();
  }

  switch (action.type) {
    
    
    case CREATE_CART_ITEM_ACTION.REQUEST:
      return {...state, createCartItemStateLoading: true, createCartItemStateError: null};
    case CREATE_CART_ITEM_ACTION.ERROR:
      return {
        ...state,
        createCartItemStateLoading: false,
        createCartItemStateError: action.data,
      };
    case CREATE_CART_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        createCartItemStateLoading: false,
        createCartItemStateResponse: action.data,
      };
  }
  return state;
};

export default createCartItemReducer;

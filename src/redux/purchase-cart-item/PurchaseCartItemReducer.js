
import { PURCHASE_CART_ITEM_ACTION } from './PurchaseCartItemAction';


export function purchaseCartItemState() {
  return {
    purchaseCartItemStateLoading: false,
    purchaseCartItemStateResponse: null,
    purchaseCartItemStateError: null,
  };
}

const purchaseCartItemReducer = (state, action) => {
  
  if (!state || action.type === PURCHASE_CART_ITEM_ACTION.RESET) {
    return purchaseCartItemState();
  }

  switch (action.type) {
    
    
    case PURCHASE_CART_ITEM_ACTION.REQUEST:
      return {...state, purchaseCartItemStateLoading: true, purchaseCartItemStateError: null};
    case PURCHASE_CART_ITEM_ACTION.ERROR:
      return {
        ...state,
        purchaseCartItemStateLoading: false,
        purchaseCartItemStateError: action.data,
      };
    case PURCHASE_CART_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        purchaseCartItemStateLoading: false,
        purchaseCartItemStateResponse: action.data,
      };
  }
  return state;
};

export default purchaseCartItemReducer;

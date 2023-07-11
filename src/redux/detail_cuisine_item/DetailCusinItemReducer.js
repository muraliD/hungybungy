
import { DETAIL_CUSIN_ITEM_ACTION } from './DetailCusinItemAction';


export function detailCusinItemState() {
  return {
    detailCusinItemStateLoading: false,
    detailCusinItemStateResponse: null,
    detailCusinItemStateError: null,
  };
}

const detailCusinItemReducer = (state, action) => {
  
  if (!state || action.type === DETAIL_CUSIN_ITEM_ACTION.RESET) {
    return detailCusinItemState();
  }

  switch (action.type) {
    
    
    case DETAIL_CUSIN_ITEM_ACTION.REQUEST:
      return {...state, detailCusinItemStateLoading: true, detailCusinItemStateError: null};
    case DETAIL_CUSIN_ITEM_ACTION.ERROR:
      return {
        ...state,
        detailCusinItemStateLoading: false,
        detailCusinItemStateError: action.data,
      };
    case DETAIL_CUSIN_ITEM_ACTION.RESPONSE:

    
      return {
        ...state,
        detailCusinItemStateLoading: false,
        detailCusinItemStateResponse: action.data,
      };
  }
  return state;
};

export default detailCusinItemReducer;

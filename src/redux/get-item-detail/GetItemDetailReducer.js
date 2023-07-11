
import { GET_OUR_ITEMS_DETAIL_ACTION } from './GetItemDetailAction';


export function getOurItemsDetailState() {
  return {
    getOurItemsDetailStateLoading: false,
    getOurItemsDetailStateResponse: null,
    getOurItemsDetailStateError: null,
  };
}

const getOurItemsDetailReducer = (state, action) => {
  if (!state || action.type === GET_OUR_ITEMS_DETAIL_ACTION.RESET) {
    return getOurItemsDetailState();
  }

  switch (action.type) {
    
    case GET_OUR_ITEMS_DETAIL_ACTION.REQUEST:
      return {...state, getOurItemsDetailStateLoading: true, getOurItemsDetailStateError: null};
    case GET_OUR_ITEMS_DETAIL_ACTION.ERROR:
      return {
        ...state,
        getOurItemsDetailStateLoading: false,
        getOurItemsDetailStateError: action.data,
      };
    case GET_OUR_ITEMS_DETAIL_ACTION.RESPONSE:

    
      return {
        ...state,
        getOurItemsDetailStateLoading: false,
        getOurItemsDetailStateResponse: action.data,
      };
  }
  return state;
};

export default getOurItemsDetailReducer;


import { GET_OUR_BRANDS_DETAIL_ACTION } from './GetBrandDetailAction';


export function defaultGetOurBrandsDetailsState() {
  return {
    isOurBrandsDetailsLoading: false,
    getOurBrandsDetailsResponse: null,
    getOurBrandsDetailsError: null,
  };
}

const getOurBrandsDetailsReducer = (state, action) => {
  if (!state || action.type === GET_OUR_BRANDS_DETAIL_ACTION.RESET) {
    return defaultGetOurBrandsDetailsState();
  }

  switch (action.type) {
    
    case GET_OUR_BRANDS_DETAIL_ACTION.REQUEST:
      return {...state, isOurBrandsDetailsLoading: true, getOurBrandsDetailsError: null};
    case GET_OUR_BRANDS_DETAIL_ACTION.ERROR:
      return {
        ...state,
        isOurBrandsDetailsLoading: false,
        getOurBrandsDetailsError: action.data,
      };
    case GET_OUR_BRANDS_DETAIL_ACTION.RESPONSE:

    
      return {
        ...state,
        isOurBrandsDetailsLoading: false,
        getOurBrandsDetailsResponse: action.data,
      };
  }
  return state;
};

export default getOurBrandsDetailsReducer;

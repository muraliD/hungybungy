import {GET_OUR_BRANDS_ACTION} from './GetOurBrandsAction';
// export interface GetOurBrandsState {
//   isOurBrandsLoading: boolean;
//   getOurBrandsResponse: any;
//   getOurBrandsError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultGetOurBrandsState() {
  return {
    isOurBrandsLoading: false,
    getOurBrandsResponse: null,
    getOurBrandsError: null,
  };
}

const getOurBrandsReducer = (state, action) => {
  if (!state || action.type === GET_OUR_BRANDS_ACTION.RESET) {
    return defaultGetOurBrandsState();
  }

  switch (action.type) {
    
    case GET_OUR_BRANDS_ACTION.REQUEST:
      return {...state, isOurBrandsLoading: true, getOurBrandsError: null};
    case GET_OUR_BRANDS_ACTION.ERROR:
      return {
        ...state,
        isOurBrandsLoading: false,
        getOurBrandsError: action.data,
      };
    case GET_OUR_BRANDS_ACTION.RESPONSE:


    
      return {
        ...state,
        isOurBrandsLoading: false,
        getOurBrandsResponse: action.data,
      };
  }
  return state;
};

export default getOurBrandsReducer;

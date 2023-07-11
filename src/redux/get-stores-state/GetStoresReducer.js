import {GET_STORES_ACTION} from './GetStoresAction';
// export interface GetStoresState {
//   isstoresLoading: boolean;
//   getStoresResponse: any;
//   getStoresError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultGetStoresState() {
  return {
    isstoresLoading: false,
    getStoresResponse: null,
    getStoresError: null,
  };
}

const getStoresReducer = (state, action) => {
  if (!state || action.type === GET_STORES_ACTION.RESET) {
    return defaultGetStoresState();
  }

  switch (action.type) {
    case GET_STORES_ACTION.REQUEST:
      return {...state, isstoresLoading: true, getStoresError: null};
    case GET_STORES_ACTION.ERROR:
      return {...state, isstoresLoading: false, getStoresError: action.data};
    case GET_STORES_ACTION.RESPONSE:
      return {...state, isstoresLoading: false, getStoresResponse: action.data};
  }
  return state;
};

export default getStoresReducer;

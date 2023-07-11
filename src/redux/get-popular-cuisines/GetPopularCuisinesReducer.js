import {GET_POPULAR_CUISINES_ACTION} from './GetPopularCuisinesAction';
// export interface GetPopularCuisinesState {
//   isPopularCuisinesLoading: boolean;
//   getPopularCuisinesResponse: any;
//   getPopularCuisinesError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultGetPopularCuisinesState() {
  return {
    isPopularCuisinesLoading: false,
    getPopularCuisinesResponse: null,
    getPopularCuisinesError: null,
  };
}

const getPopularCuisinesReducer = (state, action) => {
  if (!state || action.type === GET_POPULAR_CUISINES_ACTION.RESET) {
    return defaultGetPopularCuisinesState();
  }

  switch (action.type) {
    case GET_POPULAR_CUISINES_ACTION.REQUEST:
      return {
        ...state,
        isPopularCuisinesLoading: true,
        getPopularCuisinesError: null,
      };
    case GET_POPULAR_CUISINES_ACTION.ERROR:
      return {
        ...state,
        isPopularCuisinesLoading: false,
        getPopularCuisinesError: action.data,
      };
    case GET_POPULAR_CUISINES_ACTION.RESPONSE:
      return {
        ...state,
        isPopularCuisinesLoading: false,
        getPopularCuisinesResponse: action.data,
      };
  }
  return state;
};

export default getPopularCuisinesReducer;

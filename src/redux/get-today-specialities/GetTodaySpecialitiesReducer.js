import {GET_TODAY_SPECIALITIES_ACTION} from './GetTodaySpecialitiesAction';
// export interface GetTodaySpecialitiesState {
//   isTodaySpecialitiesLoading: boolean;
//   getTodaySpecialitiesResponse: any;
//   getTodaySpecialitiesError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultGetTodaySpecialitiesState() {
  return {
    isTodaySpecialitiesLoading: false,
    getTodaySpecialitiesResponse: null,
    getTodaySpecialitiesError: null,
  };
}

const getTodaySpecialitiesReducer = (state, action) => {
  if (!state || action.type === GET_TODAY_SPECIALITIES_ACTION.RESET) {
    return defaultGetTodaySpecialitiesState();
  }

  switch (action.type) {
    case GET_TODAY_SPECIALITIES_ACTION.REQUEST:
      return {
        ...state,
        isTodaySpecialitiesLoading: true,
        getTodaySpecialitiesError: null,
      };
    case GET_TODAY_SPECIALITIES_ACTION.ERROR:
      return {
        ...state,
        isTodaySpecialitiesLoading: false,
        getTodaySpecialitiesError: action.data,
      };
    case GET_TODAY_SPECIALITIES_ACTION.RESPONSE:
      return {
        ...state,
        isTodaySpecialitiesLoading: false,
        getTodaySpecialitiesResponse: action.data,
      };
  }
  return state;
};

export default getTodaySpecialitiesReducer;

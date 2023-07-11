import {GET_MOBILE_APP_SLIDERS_ACTION} from './GetMobileAppSlidersAction';
// export interface GetMobileAppSlidersState {
//   isMobileAppSlidersLoading: boolean;
//   getMobileAppSlidersResponse: any;
//   getMobileAppSlidersError: any;
// }
// interface ActionInterface {
//   type: string;
//   data: any;
// }

export function defaultGetMobileAppSlidersState() {
  return {
    isMobileAppSlidersLoading: false,
    getMobileAppSlidersResponse: null,
    getMobileAppSlidersError: null,
  };
}

const getMobileAppSlidersReducer = (state, action) => {
  if (!state || action.type === GET_MOBILE_APP_SLIDERS_ACTION.RESET) {
    return defaultGetMobileAppSlidersState();
  }

  switch (action.type) {
    case GET_MOBILE_APP_SLIDERS_ACTION.REQUEST:
      return {
        ...state,
        isMobileAppSlidersLoading: true,
        getMobileAppSlidersError: null,
      };
    case GET_MOBILE_APP_SLIDERS_ACTION.ERROR:
      return {
        ...state,
        isMobileAppSlidersLoading: false,
        getMobileAppSlidersError: action.data,
      };
    case GET_MOBILE_APP_SLIDERS_ACTION.RESPONSE:
      return {
        ...state,
        isMobileAppSlidersLoading: false,
        getMobileAppSlidersResponse: action.data,
      };
  }
  return state;
};

export default getMobileAppSlidersReducer;

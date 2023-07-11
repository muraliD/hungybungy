import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { userOrderDetailsError,userOrderDetailsResponse,USER_ORDER_DETAILS_ACTION } from './UserOrderDetailsAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* userOrderDetailsRequest(action) {
  
  try {
    const response = yield call(userOrderDetailsData, action.data);
    yield put(userOrderDetailsResponse(response));
  } catch (error) {
    yield put(userOrderDetailsError(error));
  }
}

async function userOrderDetailsData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.MY_ORDERS,data
  , config);

  
    console.log('Add address ', result.data);

    return result.data;
  } catch (e) {
    const {response = {}} = e;
    // console.log("login error", JSON.stringify(e))
    // const { data = { error: "", displayMessage: "" } } = response;
    // if (data.displayMessage) throw new Error(data.displayMessage);
    // console.log("error", e);
    throw e.message;
  }
}

export function* userOrderDetailsSaga() {

  yield takeLatest(USER_ORDER_DETAILS_ACTION.REQUEST, userOrderDetailsRequest);
}

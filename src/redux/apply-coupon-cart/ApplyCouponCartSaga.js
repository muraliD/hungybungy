import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { applyCouponCartError,applyCouponCartResponse,APPLY_COUPON_CART_ACTION } from './ApplyCouponCartAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* applyCouponCartRequest(action) {
  
  try {
    const response = yield call(applyCouponCartData, action.data);
    yield put(applyCouponCartResponse(response));
  } catch (error) {
    yield put(applyCouponCartError(error));
  }
}

async function applyCouponCartData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.APPLY_COUPON,data
  , config);

  
    console.log('CART coupon info: ', result.data);

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

export function* applyCouponCartSaga() {

  yield takeLatest(APPLY_COUPON_CART_ACTION.REQUEST, applyCouponCartRequest);
}

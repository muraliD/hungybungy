import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { detailCusinItemError,detailCusinItemResponse,DETAIL_CUSIN_ITEM_ACTION } from './DetailCusinItemAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* detailCusinItemRequest(action) {
  
  try {
    const response = yield call(detailCusinItemData, action.data);
    yield put(detailCusinItemResponse(response));
  } catch (error) {
    yield put(detailCusinItemError(error));
  }
}

async function detailCusinItemData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.CUISINES_ITEMS,data
  , config);

  
    console.log('Cusines details coupon info: ', result.data);

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

export function* detailCusinItemSaga() {

  yield takeLatest(DETAIL_CUSIN_ITEM_ACTION.REQUEST, detailCusinItemRequest);
}

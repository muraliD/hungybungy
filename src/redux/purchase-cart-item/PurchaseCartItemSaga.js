import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { purchaseCartItemError,purchaseCartItemsResponse,PURCHASE_CART_ITEM_ACTION } from './PurchaseCartItemAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* purchaseCartItemRequest(action) {
  
  try {
    const response = yield call(purchaseCartItemData, action.data);
    yield put(purchaseCartItemsResponse(response));
  } catch (error) {
    yield put(purchaseCartItemError(error));
  }
}

async function purchaseCartItemData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.TRANSACTION,data
  , config);

  
    console.log('PURCHASE ORDER info: ', result.data);

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

export function* purchaseCartSaga() {

  yield takeLatest(PURCHASE_CART_ITEM_ACTION.REQUEST, purchaseCartItemRequest);
}

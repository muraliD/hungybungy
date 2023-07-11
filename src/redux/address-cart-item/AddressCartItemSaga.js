import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { addressCartItemError,addressCartItemsResponse,ADDRESS_CART_ITEM_ACTION } from './AddressCartItemAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* addressCartItemRequest(action) {
  
  try {
    const response = yield call(addressCartItemData, action.data);
    yield put(addressCartItemsResponse(response));
  } catch (error) {
    yield put(addressCartItemError(error));
  }
}

async function addressCartItemData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.ADDRESSES,data
  , config);

  
    console.log('CART delte info: ', result.data);

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

export function* addressCartSaga() {

  yield takeLatest(ADDRESS_CART_ITEM_ACTION.REQUEST, addressCartItemRequest);
}

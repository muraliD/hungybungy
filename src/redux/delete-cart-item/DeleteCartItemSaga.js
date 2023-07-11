import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { deleteCartItemError,deleteCartItemsResponse,DELETE_CART_ITEM_ACTION } from './DeleteCartItemAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* deleteCartItemRequest(action) {
  
  try {
    const response = yield call(deleteCartItemData, action.data);
    yield put(deleteCartItemsResponse(response));
  } catch (error) {
    yield put(deleteCartItemError(error));
  }
}

async function deleteCartItemData(data) {
  debugger
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.DELETE_CART,data
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

export function* deleteCartSaga() {

  yield takeLatest(DELETE_CART_ITEM_ACTION.REQUEST, deleteCartItemRequest);
}

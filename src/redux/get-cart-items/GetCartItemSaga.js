import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { getCartItemError,getCartItemsResponse,GET_CART_ITEM_ACTION } from './GetCartItemAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getCartItemRequest(action) {
  
  try {
    const response = yield call(getCartItemData, action.data);
    yield put(getCartItemsResponse(response));
  } catch (error) {
    yield put(getCartItemError(error));
  }
}

async function getCartItemData(data) {

  
  
  const config = getHeaderConfig();
  try {
    console.log('CART inputttttt info: ', data);
    const result = await httpClient.post(API_METHOD.GET_CART,data
  , config);


    console.log('CART  info: ', result.data);


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

export function* getcartSaga() {

  yield takeLatest(GET_CART_ITEM_ACTION.REQUEST, getCartItemRequest);
}

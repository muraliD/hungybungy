import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { createCartItemError,createCartItemsResponse,CREATE_CART_ITEM_ACTION } from './CreateCartItemAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* createCartItemRequest(action) {
  
  try {
    const response = yield call(createCartItemData, action.data);
    yield put(createCartItemsResponse(response));
  } catch (error) {
    yield put(createCartItemError(error));
  }
}

async function createCartItemData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.ORDER,data
  , config);

  
    console.log('CREATE ORDER info: ', result.data);

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

export function* createCartSaga() {

  yield takeLatest(CREATE_CART_ITEM_ACTION.REQUEST, createCartItemRequest);
}

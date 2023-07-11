import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { addCartItemError,addCartItemResponse,ADD_CART_ITEM_ACTION } from './AddCartItemAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* AddCartItemRequest(action) {
  
  try {
    const response = yield call(addCartItemData, action.data);
    yield put(addCartItemResponse(response));
  } catch (error) {
    yield put(addCartItemError(error));
  }
}

async function addCartItemData(data) {
  
  const config = getHeaderConfig();
  try {
    console.log('CART ADD request: ', data);
  
    const result = await httpClient.post(API_METHOD.ADD_CART,data
  , config);

  
    console.log('CART ADD info: ', result.data);

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

export function* addtocartSaga() {
  yield takeLatest(ADD_CART_ITEM_ACTION.REQUEST, AddCartItemRequest);
}

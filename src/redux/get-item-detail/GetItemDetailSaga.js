import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { getOurItemsDetailError,getOurItemsDetailResponse,GET_OUR_ITEMS_DETAIL_ACTION } from './GetItemDetailAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getOurItemsDetailRequest(action) {
  
  try {
    const response = yield call(getOurItemsDetailData, action.data);
    yield put(getOurItemsDetailResponse(response));
  } catch (error) {
    yield put(getOurItemsDetailError(error));
  }
}

async function getOurItemsDetailData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.ITEM_DETAILS,data
  , config);

  
    console.log('ITEM DETAILS  info: ', result.data);

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

export function* getOurItemsDetailWatcherSaga() {
  yield takeLatest(GET_OUR_ITEMS_DETAIL_ACTION.REQUEST, getOurItemsDetailRequest);
}

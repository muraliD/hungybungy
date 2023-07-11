import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { getOurBrandsDetailError,getOurBrandsDetailResponse,GET_OUR_BRANDS_DETAIL_ACTION } from './GetBrandDetailAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getOurBrandsDetailsRequest(action) {
  
  try {
    const response = yield call(postGetOurBrandsDetailsData, action.data);
    yield put(getOurBrandsDetailResponse(response));
  } catch (error) {
    yield put(getOurBrandsDetailError(error));
  }
}

async function postGetOurBrandsDetailsData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.BRAND_DETAILS,data
  , config);

  
    console.log('brands DETAILS  info: ', result.data);

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

export function* getOurBrandsDetailsWatcherSaga() {
  yield takeLatest(GET_OUR_BRANDS_DETAIL_ACTION.REQUEST, getOurBrandsDetailsRequest);
}

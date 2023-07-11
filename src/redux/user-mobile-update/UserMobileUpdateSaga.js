import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { userMobileUpdateError,userMobileUpdateResponse,USER_MOBILE_UPDATE_ACTION } from './UserMobileUpdateAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* userMobileUpdateRequest(action) {
  
  try {
    const response = yield call(userMobileUpdateData, action.data);
    yield put(userMobileUpdateResponse(response));
  } catch (error) {
    yield put(userMobileUpdateError(error));
  }
}

async function userMobileUpdateData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.MOBILE_UPDATE,data
  , config);

  
    console.log('Mobile UPDATE ', result.data);

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

export function* userMobileUpdateSaga() {

  yield takeLatest(USER_MOBILE_UPDATE_ACTION.REQUEST, userMobileUpdateRequest);
}

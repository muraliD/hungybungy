import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { userProfileDataError,userProfileDataResponse,USER_PROFILE_DATA_ACTION } from './UserProfileDataAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* userProfileDataRequest(action) {
  
  try {
    const response = yield call(userProfileDataData, action.data);
    yield put(userProfileDataResponse(response));
  } catch (error) {
    yield put(userProfileDataError(error));
  }
}

async function userProfileDataData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.PROFILE,data
  , config);

  
    console.log('UserData ', result.data);

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

export function* userProfileDataSaga() {

  yield takeLatest(USER_PROFILE_DATA_ACTION.REQUEST, userProfileDataRequest);
}

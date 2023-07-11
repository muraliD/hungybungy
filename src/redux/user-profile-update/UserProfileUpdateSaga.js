import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { userProfileUpdateError,userProfileUpdateResponse,USER_PROFILE_UPDATE_ACTION } from './UserProfileUpdateAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* userProfileUpdateRequest(action) {
  
  try {
    const response = yield call(userProfileUpdateData, action.data);
    yield put(userProfileUpdateResponse(response));
  } catch (error) {
    yield put(userProfileUpdateError(error));
  }
}

async function userProfileUpdateData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.PROFILE_UPDATE,data
  , config);

  
    console.log('PROFILE UPDATE ', result.data);

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

export function* userProfileUpdateSaga() {

  yield takeLatest(USER_PROFILE_UPDATE_ACTION.REQUEST, userProfileUpdateRequest);
}

import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { updateAddressUsersError,updateAddressUsersResponse,UPDATE_ADDRESS_USERS_ACTION } from './UpdateAddressUsersAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* updateAddressUserRequest(action) {
  
  try {
    const response = yield call(updateAddressUserData, action.data);
    yield put(updateAddressUsersResponse(response));
  } catch (error) {
    yield put(updateAddressUsersError(error));
  }
}

async function updateAddressUserData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.UPDATE_ADDRESSES,data
  , config);

  
    console.log('Update address ', result.data);

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

export function* updateAddressUserSaga() {

  yield takeLatest(UPDATE_ADDRESS_USERS_ACTION.REQUEST, updateAddressUserRequest);
}

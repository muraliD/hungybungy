import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { addAddressUsersError,addAddressUsersResponse,ADD_ADDRESS_USERS_ACTION } from './AddAddressUsersAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* addAddressUserRequest(action) {
  
  try {
    const response = yield call(addAddressUserData, action.data);
    yield put(addAddressUsersResponse(response));
  } catch (error) {
    yield put(addAddressUsersError(error));
  }
}

async function addAddressUserData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.ADD_ADDRESSES,data
  , config);

  
    console.log('Add address ', result.data);

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

export function* addAddressUserSaga() {

  yield takeLatest(ADD_ADDRESS_USERS_ACTION.REQUEST, addAddressUserRequest);
}

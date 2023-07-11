import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { deleteAddressUsersError,deleteAddressUsersResponse,DELETE_ADDRESS_USERS_ACTION } from './DeleteAddressUsersAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* deleteAddressUsersRequest(action) {
  
  try {
    const response = yield call(deleteAddressUsersData, action.data);
    yield put(deleteAddressUsersResponse(response));
  } catch (error) {
    yield put(deleteAddressUsersError(error));
  }
}

async function deleteAddressUsersData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.DELETE_ADDRESSES,data
  , config);

  
    console.log('DELETE address ', result.data);

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

export function* deleteAddressUsersSaga() {

  yield takeLatest(DELETE_ADDRESS_USERS_ACTION.REQUEST, deleteAddressUsersRequest);
}

import {takeLatest, put, call} from '@redux-saga/core/effects';
import { storeAddressUsersError,storeAddressUsersResponse,STORE_ADDRESS_USERS_ACTION } from './StoreAddressUsersAction';



function* storeAddressUserRequest(action) {
  
  try {
    const response = yield call(storeAddressUserData, action.data);
    yield put(storeAddressUsersResponse(response));
  } catch (error) {
    yield put(storeAddressUsersError(error));
  }
}

async function storeAddressUserData(data) {
  

  try {
    return data;
  } catch (e) {
    const {response = {}} = e;
    // console.log("login error", JSON.stringify(e))
    // const { data = { error: "", displayMessage: "" } } = response;
    // if (data.displayMessage) throw new Error(data.displayMessage);
    // console.log("error", e);
    throw e.message;
  }
}

export function* storeAddressUserSaga() {

  yield takeLatest(STORE_ADDRESS_USERS_ACTION.REQUEST, storeAddressUserRequest);
}

import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  getStoresError,
  getStoresResponse,
  GET_STORES_ACTION,
} from './GetStoresAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getStoresRequest(action) {
  try {
    const response = yield call(postGetStoresData, action.data);
    yield put(getStoresResponse(response));
  } catch (error) {
    yield put(getStoresError(error));
  }
}

async function postGetStoresData() {
  const config = getHeaderConfig();
  try {
    const result = await httpClient.get(API_METHOD.GET_STORES, config);
    console.log('stores info: ', result.data);

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

export function* getStoresWatcherSaga() {
  yield takeLatest(GET_STORES_ACTION.REQUEST, getStoresRequest);
}

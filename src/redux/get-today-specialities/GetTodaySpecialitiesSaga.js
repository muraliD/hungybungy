import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  getTodaySpecialitiesError,
  getTodaySpecialitiesResponse,
  GET_TODAY_SPECIALITIES_ACTION,
} from './GetTodaySpecialitiesAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getTodaySpecialitiesRequest(action) {
  try {
    const response = yield call(postGetTodaySpecialitiesData, action.data);
    yield put(getTodaySpecialitiesResponse(response));
  } catch (error) {
    yield put(getTodaySpecialitiesError(error));
  }
}

async function postGetTodaySpecialitiesData(data) {
  const config = getHeaderConfig();
  try {
    const result = await httpClient.post(API_METHOD.TODAY_SPECIALITIES,data, config);
    console.log('today specialities info: ', result.data);

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

export function* getTodaySpecialitiesWatcherSaga() {
  yield takeLatest(
    GET_TODAY_SPECIALITIES_ACTION.REQUEST,
    getTodaySpecialitiesRequest,
  );
}

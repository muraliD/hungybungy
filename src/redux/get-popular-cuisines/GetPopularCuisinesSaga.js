import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  getPopularCuisinesError,
  getPopularCuisinesResponse,
  GET_POPULAR_CUISINES_ACTION,
} from './GetPopularCuisinesAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getPopularCuisinesRequest(action) {
  try {
    const response = yield call(postGetPopularCuisinesData, action.data);
    yield put(getPopularCuisinesResponse(response));
  } catch (error) {
    yield put(getPopularCuisinesError(error));
  }
}

async function postGetPopularCuisinesData(data) {
  const config = getHeaderConfig();
  try {
    
    const result = await httpClient.post(API_METHOD.POPULAR_CUISINES,data ,config);
    console.log('popular cuisines info: ', result.data);

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

export function* getPopularCuisinesWatcherSaga() {
  yield takeLatest(
    GET_POPULAR_CUISINES_ACTION.REQUEST,
    getPopularCuisinesRequest,
  );
}

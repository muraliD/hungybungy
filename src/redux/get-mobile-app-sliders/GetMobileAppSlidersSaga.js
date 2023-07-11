import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  getMobileAppSlidersError,
  getMobileAppSlidersResponse,
  GET_MOBILE_APP_SLIDERS_ACTION,
} from './GetMobileAppSlidersAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getMobileAppSlidersRequest(action) {
  try {
    const response = yield call(postGetMobileAppSlidersData, action.data);
    yield put(getMobileAppSlidersResponse(response));
  } catch (error) {
    yield put(getMobileAppSlidersError(error));
  }
}

async function postGetMobileAppSlidersData() {
  const config = getHeaderConfig();
  try {
    console.log('banners info request: ');
    const result = await httpClient.get(API_METHOD.MOBILE_APP_SLIDERS, config);
    console.log('banners info: ', result.data);

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

export function* getMobileAppSlidersWatcherSaga() {
  yield takeLatest(
    GET_MOBILE_APP_SLIDERS_ACTION.REQUEST,
    getMobileAppSlidersRequest,
  );
}
